import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

export const UrlExtractorTest = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [extractedUrls, setExtractedUrls] = useState<string[]>([]);
  const [shouldRecrawl, setShouldRecrawl] = useState(false);
  const { toast } = useToast();

  const sampleMessages = [
    "please recrawl this url in parsely https://www.cnbc.com/2025/08/15/cnbc-daily-open-mixing-business-with-politics-to-build-a-chip-empire.html",
    "jumpstart parsely https://techcrunch.com/2024/article and also https://example.com/news",
    "Can you re-crawl this? https://www.example.com/breaking-news",
    "Need to recrawl: https://blog.example.com/post/123",
    "Just some regular message with https://example.com but no recrawl request"
  ];

  const extractUrls = (text: string): string[] => {
    // Updated regex to match various URL formats
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const matches = text.match(urlRegex);
    return matches || [];
  };

  const detectRecrawlIntent = (text: string): boolean => {
    const recrawlKeywords = [
      'recrawl',
      're-crawl',
      'jumpstart parsely',
      'parsely recrawl',
      'crawl again',
      'refresh parsely',
      'update parsely'
    ];
    
    const lowerText = text.toLowerCase();
    return recrawlKeywords.some(keyword => lowerText.includes(keyword));
  };

  const analyzeMessage = () => {
    if (!inputMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message to analyze",
        variant: "destructive",
      });
      return;
    }

    const urls = extractUrls(inputMessage);
    const hasRecrawlIntent = detectRecrawlIntent(inputMessage);
    
    setExtractedUrls(urls);
    setShouldRecrawl(hasRecrawlIntent);

    toast({
      title: "Message Analyzed",
      description: `Found ${urls.length} URL(s), Recrawl intent: ${hasRecrawlIntent ? 'Yes' : 'No'}`,
    });
  };

  const loadSampleMessage = (message: string) => {
    setInputMessage(message);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>URL Extractor Test</CardTitle>
          <CardDescription>
            Test the URL extraction and recrawl intent detection logic
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
                  onClick={() => loadSampleMessage(message)}
                >
                  <span className="text-xs break-all">{message}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Test Message</label>
            <Textarea
              placeholder="Enter a Slack message to test URL extraction..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              rows={4}
            />
          </div>
          
          <Button onClick={analyzeMessage} className="w-full">
            Analyze Message
          </Button>
        </CardContent>
      </Card>

      {(extractedUrls.length > 0 || shouldRecrawl !== null) && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                Recrawl Intent Detected:
                <Badge variant={shouldRecrawl ? "default" : "secondary"}>
                  {shouldRecrawl ? "Yes" : "No"}
                </Badge>
              </h4>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Extracted URLs ({extractedUrls.length})</h4>
              {extractedUrls.length > 0 ? (
                <div className="space-y-2">
                  {extractedUrls.map((url, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all"
                      >
                        {url}
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No URLs found in the message</p>
              )}
            </div>
            
            {shouldRecrawl && extractedUrls.length > 0 && (
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  ✅ This message would trigger a recrawl for {extractedUrls.length} URL(s)
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};