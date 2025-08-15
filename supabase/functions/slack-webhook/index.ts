import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.text()
    console.log('Received webhook:', body)

    // Parse the request body
    let payload
    try {
      payload = JSON.parse(body)
    } catch (e) {
      console.error('Failed to parse JSON:', e)
      return new Response('Invalid JSON', { status: 400, headers: corsHeaders })
    }

    // Handle Slack URL verification challenge
    if (payload.type === 'url_verification') {
      console.log('Handling URL verification challenge')
      return new Response(payload.challenge, { 
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' } 
      })
    }

    // Handle Slack events
    if (payload.type === 'event_callback' && payload.event) {
      const event = payload.event
      console.log('=== EVENT PROCESSING DEBUG ===')
      console.log('Event type:', event.type)
      console.log('Event:', JSON.stringify(event, null, 2))

      // Only respond to messages (not bot messages to avoid loops)
      if (event.type === 'message' && !event.bot_id && event.text) {
        const message = event.text
        const channel = event.channel
        const user = event.user
        const messageTs = event.ts // Get original message timestamp for threading

        console.log('=== MESSAGE PROCESSING DEBUG ===')
        console.log(`Message from ${user} in ${channel}: "${message}"`)
        console.log('Message timestamp:', messageTs)

        // Extract URLs from the message
        const urls = extractUrls(message)
        console.log('Extracted URLs:', urls)

        // Check if this looks like a recrawl request
        const isRecrawlRequest = detectRecrawlIntent(message)
        console.log('Is recrawl request:', isRecrawlRequest)

        // Prepare response
        let responseText = ''
        
        if (isRecrawlRequest && urls.length > 0) {
          console.log('🔥 Processing recrawl request with URLs')
          responseText = `🔥 Starting Firecrawl analysis for ${urls.length} URL(s)...\n${urls.map(url => `• ${url}`).join('\n')}`
          
          // Process URLs with Firecrawl
          for (const url of urls) {
            try {
              const crawlResult = await crawlUrlWithFirecrawl(url)
              if (crawlResult.success) {
                responseText += `\n\n✅ **${url}**\n📄 ${crawlResult.data.description || 'Content crawled successfully'}`
                
                // Add word count if available
                if (crawlResult.data.markdown) {
                  const wordCount = crawlResult.data.markdown.split(' ').length
                  responseText += `\n📊 Word count: ${wordCount}`
                }
              } else {
                responseText += `\n\n❌ **${url}**\n💥 Failed to crawl: ${crawlResult.error}`
              }
            } catch (error) {
              responseText += `\n\n❌ **${url}**\n💥 Error: ${error.message}`
            }
          }
        } else if (urls.length > 0) {
          console.log('📎 Found URLs but no recrawl intent')
          responseText = `📎 I detected ${urls.length} URL(s) in your message:\n${urls.map(url => `• ${url}`).join('\n')}\n\n💡 Say "crawl" or "analyze" to process them with Firecrawl!`
        } else if (isRecrawlRequest) {
          console.log('🤔 Recrawl intent but no URLs found')
          responseText = `🤔 I see you want to crawl something, but I didn't find any URLs in your message. Could you please include the URL you'd like me to process?`
        } else {
          console.log('👋 General message - responding with help')
          responseText = `👋 Hi! I'm a crawling bot. Send me URLs with words like "crawl", "analyze", or "process" and I'll analyze them for you!`
        }

        console.log('=== RESPONSE PREPARATION ===')
        console.log('Response text length:', responseText.length)
        console.log('Response preview:', responseText.substring(0, 200) + '...')

        // Send response to Slack thread if we have something to say
        if (responseText) {
          console.log('🚀 Calling sendSlackMessage...')
          await sendSlackMessage(channel, responseText, messageTs)
        } else {
          console.log('❌ No response text generated')
        }
      } else {
        console.log('=== MESSAGE IGNORED ===')
        console.log('Reason: event.type =', event.type, ', bot_id =', event.bot_id, ', has text =', !!event.text)
      }
    } else {
      console.log('=== EVENT IGNORED ===')
      console.log('Payload type:', payload.type)
      console.log('Has event:', !!payload.event)
    }

    return new Response('OK', { headers: corsHeaders })

  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response('Internal Server Error', { 
      status: 500, 
      headers: corsHeaders 
    })
  }
})

function extractUrls(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s<>"\[\]{}|\\^`]+/gi
  const matches = text.match(urlRegex)
  return matches ? [...new Set(matches)] : []
}

function detectRecrawlIntent(text: string): boolean {
  const recrawlKeywords = [
    'recrawl', 're-crawl', 'crawl', 'refresh', 'update', 'reindex', 're-index',
    'process', 'analyze', 'scan', 'check', 'review', 'firecrawl'
  ]
  
  const lowerText = text.toLowerCase()
  return recrawlKeywords.some(keyword => lowerText.includes(keyword))
}

async function crawlUrlWithFirecrawl(url: string) {
  const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY')
  
  if (!firecrawlApiKey) {
    console.error('FIRECRAWL_API_KEY not found in environment')
    return { success: false, error: 'Firecrawl API key not configured' }
  }

  try {
    console.log(`Starting Firecrawl for: ${url}`)
    
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        formats: ['markdown', 'html'],
        includeTags: ['title', 'description'],
        excludeTags: ['nav', 'footer', 'aside'],
        waitFor: 2000
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Firecrawl API error: ${response.status} - ${errorText}`)
      return { 
        success: false, 
        error: `API error: ${response.status}` 
      }
    }

    const result = await response.json()
    
    if (result.success) {
      console.log(`Firecrawl successful for: ${url}`)
      return {
        success: true,
        data: {
          title: result.data.metadata?.title || 'No title',
          description: result.data.metadata?.description || 'No description',
          markdown: result.data.markdown,
          html: result.data.html,
          url: url
        }
      }
    } else {
      console.error(`Firecrawl failed: ${result.error}`)
      return { 
        success: false, 
        error: result.error || 'Unknown error' 
      }
    }
  } catch (error) {
    console.error('Error calling Firecrawl API:', error)
    return { 
      success: false, 
      error: error.message || 'Network error' 
    }
  }
}

async function sendSlackMessage(channel: string, text: string, threadTs?: string) {
  const slackToken = Deno.env.get('SLACK_BOT_TOKEN')
  
  console.log('=== SLACK MESSAGE DEBUG ===')
  console.log('Channel:', channel)
  console.log('Text preview:', text.substring(0, 100) + '...')
  console.log('Thread TS:', threadTs)
  console.log('Token exists:', !!slackToken)
  console.log('Token starts with xoxb:', slackToken?.startsWith('xoxb-'))
  
  if (!slackToken) {
    console.error('❌ SLACK_BOT_TOKEN not found in environment')
    return
  }

  if (!slackToken.startsWith('xoxb-')) {
    console.error('❌ SLACK_BOT_TOKEN does not start with xoxb- (got:', slackToken.substring(0, 10) + '...)')
    return
  }

  try {
    console.log('🚀 Sending message to Slack API...')
    
    const payload = {
      channel: channel,
      text: text,
      thread_ts: threadTs,
      unfurl_links: false,
      unfurl_media: false
    }
    
    console.log('Payload:', JSON.stringify(payload, null, 2))
    
    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${slackToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    console.log('Slack API Response Status:', response.status)
    console.log('Slack API Response Headers:', Object.fromEntries(response.headers.entries()))
    
    const result = await response.json()
    console.log('Slack API Response Body:', JSON.stringify(result, null, 2))
    
    if (!result.ok) {
      console.error('❌ Slack API Error:', result.error)
      console.error('❌ Full error response:', result)
    } else {
      console.log('✅ Message sent successfully to Slack')
    }
  } catch (error) {
    console.error('❌ Network error sending message to Slack:', error)
    console.error('❌ Error details:', error.message, error.stack)
  }
}