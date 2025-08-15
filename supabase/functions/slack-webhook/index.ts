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
      console.log('Processing event:', event.type)

      // Only respond to messages (not bot messages to avoid loops)
      if (event.type === 'message' && !event.bot_id && event.text) {
        const message = event.text
        const channel = event.channel
        const user = event.user

        console.log(`Message from ${user} in ${channel}: ${message}`)

        // Extract URLs from the message
        const urls = extractUrls(message)
        console.log('Extracted URLs:', urls)

        // Check if this looks like a recrawl request
        const isRecrawlRequest = detectRecrawlIntent(message)
        console.log('Is recrawl request:', isRecrawlRequest)

        // Prepare response
        let responseText = ''
        
        if (isRecrawlRequest && urls.length > 0) {
          responseText = `🔍 I found ${urls.length} URL(s) in your message:\n${urls.map(url => `• ${url}`).join('\n')}\n\n⚠️ Parse.ly integration is not configured yet, but I can help you set it up when you're ready!`
        } else if (urls.length > 0) {
          responseText = `📎 I detected ${urls.length} URL(s) in your message:\n${urls.map(url => `• ${url}`).join('\n')}`
        } else if (isRecrawlRequest) {
          responseText = `🤔 I see you want to recrawl something, but I didn't find any URLs in your message. Could you please include the URL you'd like me to process?`
        }

        // Send response to Slack if we have something to say
        if (responseText) {
          await sendSlackMessage(channel, responseText)
        }
      }
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
    'process', 'analyze', 'scan', 'check', 'review'
  ]
  
  const lowerText = text.toLowerCase()
  return recrawlKeywords.some(keyword => lowerText.includes(keyword))
}

async function sendSlackMessage(channel: string, text: string) {
  const slackToken = Deno.env.get('SLACK_BOT_TOKEN')
  
  if (!slackToken) {
    console.error('SLACK_BOT_TOKEN not found in environment')
    return
  }

  try {
    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${slackToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: channel,
        text: text,
        unfurl_links: false,
        unfurl_media: false
      })
    })

    const result = await response.json()
    
    if (!result.ok) {
      console.error('Failed to send Slack message:', result.error)
    } else {
      console.log('Message sent successfully to Slack')
    }
  } catch (error) {
    console.error('Error sending message to Slack:', error)
  }
}