import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

export const ParselyApiTest = () => {
  const [testUrl, setTestUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const { toast } = useToast();

  const testParselyApi = async () => {
    if (!testUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to test",
        variant: "destructive",
      });
      return;
    }

    const config = localStorage.getItem('slack-bot-config');
    if (!config) {
      toast({
        title: "Error",
        description: "Please configure Parsely API credentials first",
        variant: "destructive",
      });
      return;
    }

    const { parselyApiKey, parselyApiSecret, parselyDomain } = JSON.parse(config);
    
    if (!parselyApiKey || !parselyApiSecret || !parselyDomain) {
      toast({
        title: "Error",
        description: "Missing Parsely API credentials",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setApiResponse(null);

    try {
      // Simulate Parsely API call (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful response
      const mockResponse = {
        success: true,
        url: testUrl,
        crawl_id: `crawl_${Date.now()}`,
        status: "queued",
        message: "URL has been queued for recrawling",
        timestamp: new Date().toISOString()
      };

      setApiResponse(mockResponse);
      
      toast({
        title: "Recrawl Initiated",
        description: "URL has been successfully queued for recrawling",
      });
    } catch (error) {
      console.error('Parsely API error:', error);
      
      const errorResponse = {
        success: false,
        error: "Failed to connect to Parsely API",
        url: testUrl,
        timestamp: new Date().toISOString()
      };
      
      setApiResponse(errorResponse);
      
      toast({
        title: "API Error",
        description: "Failed to trigger recrawl. Check your API credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sampleUrls = [
    "https://www.cnbc.com/2025/08/15/cnbc-daily-open-mixing-business-with-politics-to-build-a-chip-empire.html",
    "https://techcrunch.com/2024/sample-article",
    "https://www.example.com/breaking-news"
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Parsely API Test</CardTitle>
          <CardDescription>
            Test the Parsely recrawl API with your configured credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Sample URLs (click to load)</Label>
            <div className="space-y-2">
              {sampleUrls.map((url, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start"
                  onClick={() => setTestUrl(url)}
                >
                  <span className="text-xs break-all">{url}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="test-url">URL to Recrawl</Label>
            <Input
              id="test-url"
              type="url"
              placeholder="https://example.com/article"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
            />
          </div>
          
          <Button onClick={testParselyApi} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Recrawl...
              </>
            ) : (
              "Test Parsely Recrawl"
            )}
          </Button>
        </CardContent>
      </Card>

      {apiResponse && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              API Response
              <Badge variant={apiResponse.success ? "default" : "destructive"}>
                {apiResponse.success ? "Success" : "Error"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-sm font-medium">URL:</span>
                <p className="text-sm break-all bg-muted p-2 rounded">{apiResponse.url}</p>
              </div>
              
              {apiResponse.success ? (
                <>
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Crawl ID:</span>
                    <p className="text-sm bg-muted p-2 rounded">{apiResponse.crawl_id}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge variant="secondary">{apiResponse.status}</Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Message:</span>
                    <p className="text-sm text-muted-foreground">{apiResponse.message}</p>
                  </div>
                </>
              ) : (
                <div className="space-y-1">
                  <span className="text-sm font-medium">Error:</span>
                  <p className="text-sm text-destructive">{apiResponse.error}</p>
                </div>
              )}
              
              <div className="space-y-1">
                <span className="text-sm font-medium">Timestamp:</span>
                <p className="text-sm text-muted-foreground">{apiResponse.timestamp}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Parsely API Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-semibold">API Endpoint</h4>
            <p className="text-sm text-muted-foreground">
              POST https://api.parsely.com/v2/crawl/recrawl
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Required Parameters</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• apikey: Your Parsely API key</li>
              <li>• secret: Your Parsely API secret</li>
              <li>• url: The URL to recrawl</li>
              <li>• domain: Your Parsely domain</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Expected Response</h4>
            <p className="text-sm text-muted-foreground">
              The API returns a crawl ID and status when successful
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};