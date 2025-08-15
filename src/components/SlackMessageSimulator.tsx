import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, MessageSquare, CheckCircle2 } from 'lucide-react';

interface ProcessingStep {
  step: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  message: string;
  timestamp?: string;
}

export const SlackMessageSimulator = () => {
  const [slackMessage, setSlackMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);
  const [finalResponse, setFinalResponse] = useState('');
  const { toast } = useToast();

  const sampleMessages = [
    "please recrawl this url in parsely https://www.cnbc.com/2025/08/15/cnbc-daily-open-mixing-business-with-politics-to-build-a-chip-empire.html",
    "jumpstart parsely https://techcrunch.com/2024/sample-article and https://example.com/news",
    "Can you re-crawl this? https://www.example.com/breaking-news",
    "Just a regular message with https://example.com but no recrawl request"
  ];

  const extractUrls = (text: string): string[] => {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    return text.match(urlRegex) || [];
  };

  const detectRecrawlIntent = (text: string): boolean => {
    const recrawlKeywords = [
      'recrawl', 're-crawl', 'jumpstart parsely', 'parsely recrawl',
      'crawl again', 'refresh parsely', 'update parsely'
    ];
    const lowerText = text.toLowerCase();
    return recrawlKeywords.some(keyword => lowerText.includes(keyword));
  };

  const updateStep = (stepIndex: number, status: ProcessingStep['status'], message?: string) => {
    setProcessingSteps(prev => prev.map((step, index) => 
      index === stepIndex 
        ? { 
            ...step, 
            status, 
            message: message || step.message,
            timestamp: status === 'completed' ? new Date().toLocaleTimeString() : step.timestamp
          }
        : step
    ));
  };

  const processSlackMessage = async () => {
    if (!slackMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a Slack message to process",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setFinalResponse('');
    
    const steps: ProcessingStep[] = [
      { step: '1', status: 'pending', message: 'Analyzing Slack message...' },
      { step: '2', status: 'pending', message: 'Extracting URLs...' },
      { step: '3', status: 'pending', message: 'Checking recrawl intent...' },
      { step: '4', status: 'pending', message: 'Calling Parsely API...' },
      { step: '5', status: 'pending', message: 'Sending Slack response...' }
    ];
    
    setProcessingSteps(steps);

    try {
      // Step 1: Analyze message
      updateStep(0, 'processing');
      await new Promise(resolve => setTimeout(resolve, 800));
      updateStep(0, 'completed', 'Message analyzed successfully');

      // Step 2: Extract URLs
      updateStep(1, 'processing');
      await new Promise(resolve => setTimeout(resolve, 600));
      const urls = extractUrls(slackMessage);
      updateStep(1, 'completed', `Found ${urls.length} URL(s)`);

      // Step 3: Check recrawl intent
      updateStep(2, 'processing');
      await new Promise(resolve => setTimeout(resolve, 500));
      const hasRecrawlIntent = detectRecrawlIntent(slackMessage);
      updateStep(2, 'completed', `Recrawl intent: ${hasRecrawlIntent ? 'Detected' : 'Not detected'}`);

      if (!hasRecrawlIntent) {
        updateStep(3, 'completed', 'Skipped - No recrawl intent detected');
        updateStep(4, 'completed', 'No response needed');
        setFinalResponse('ℹ️ Message processed but no recrawl was requested.');
        return;
      }

      if (urls.length === 0) {
        updateStep(3, 'error', 'No URLs found to recrawl');
        updateStep(4, 'error', 'Cannot send response without URLs');
        setFinalResponse('❌ Recrawl requested but no URLs found in the message.');
        return;
      }

      // Step 4: Call Parsely API
      updateStep(3, 'processing');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if config exists
      const config = localStorage.getItem('slack-bot-config');
      if (!config) {
        updateStep(3, 'error', 'Parsely API credentials not configured');
        updateStep(4, 'error', 'Cannot send response');
        setFinalResponse('❌ Parsely API credentials not configured. Please check the Configuration tab.');
        return;
      }

      const { parselyApiKey, parselyDomain } = JSON.parse(config);
      if (!parselyApiKey || !parselyDomain) {
        updateStep(3, 'error', 'Missing Parsely API credentials');
        updateStep(4, 'error', 'Cannot send response');
        setFinalResponse('❌ Missing Parsely API credentials. Please check the Configuration tab.');
        return;
      }

      updateStep(3, 'completed', `Recrawl initiated for ${urls.length} URL(s)`);

      // Step 5: Send Slack response
      updateStep(4, 'processing');
      await new Promise(resolve => setTimeout(resolve, 700));
      updateStep(4, 'completed', 'Slack thread response sent');

      const responseText = urls.length === 1 
        ? `✅ Recrawl completed for: ${urls[0]}`
        : `✅ Recrawl completed for ${urls.length} URLs:\n${urls.map(url => `• ${url}`).join('\n')}`;
      
      setFinalResponse(responseText);
      
      toast({
        title: "Processing Complete",
        description: `Successfully processed recrawl request for ${urls.length} URL(s)`,
      });

    } catch (error) {
      console.error('Processing error:', error);
      setFinalResponse('❌ An error occurred while processing the message.');
      toast({
        title: "Processing Error",
        description: "An error occurred while processing the message",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStepIcon = (status: ProcessingStep['status']) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'error':
        return <span className="h-4 w-4 text-red-500">❌</span>;
      default:
        return <span className="h-4 w-4 text-muted-foreground">⏳</span>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Full Slack Bot Simulation
          </CardTitle>
          <CardDescription>
            Test the complete flow from Slack message to Parsely recrawl and response
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Sample Messages (click to load)</label>
            <div className="space-y-2">
              {sampleMessages.map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-3"
                  onClick={() => setSlackMessage(message)}
                  disabled={isProcessing}
                >
                  <span className="text-xs break-all">{message}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Slack Message</label>
            <Textarea
              placeholder="Enter a Slack message to simulate the full bot flow..."
              value={slackMessage}
              onChange={(e) => setSlackMessage(e.target.value)}
              rows={4}
              disabled={isProcessing}
            />
          </div>
          
          <Button 
            onClick={processSlackMessage} 
            disabled={isProcessing} 
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Simulate Full Bot Flow"
            )}
          </Button>
        </CardContent>
      </Card>

      {processingSteps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Processing Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {processingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                    step.status === 'processing' ? 'bg-primary/5 border-primary/20' :
                    step.status === 'completed' ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' :
                    step.status === 'error' ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800' :
                    'bg-muted border-muted'
                  }`}
                >
                  {getStepIcon(step.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{step.message}</p>
                    {step.timestamp && (
                      <p className="text-xs text-muted-foreground">{step.timestamp}</p>
                    )}
                  </div>
                  <Badge variant={
                    step.status === 'completed' ? 'default' :
                    step.status === 'error' ? 'destructive' :
                    step.status === 'processing' ? 'secondary' : 'outline'
                  }>
                    {step.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {finalResponse && (
        <Card>
          <CardHeader>
            <CardTitle>Bot Response</CardTitle>
            <CardDescription>
              This is what would be sent as a threaded reply in Slack
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
              <pre className="text-sm whitespace-pre-wrap">{finalResponse}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};