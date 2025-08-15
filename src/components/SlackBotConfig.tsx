import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export const SlackBotConfig = () => {
  const [slackBotToken, setSlackBotToken] = useState('');
  const [parselyApiKey, setParselyApiKey] = useState('');
  const [parselyApiSecret, setParselyApiSecret] = useState('');
  const [parselyDomain, setParselyDomain] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Load saved config from localStorage
    const savedConfig = localStorage.getItem('slack-bot-config');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      setSlackBotToken(config.slackBotToken || '');
      setParselyApiKey(config.parselyApiKey || '');
      setParselyApiSecret(config.parselyApiSecret || '');
      setParselyDomain(config.parselyDomain || '');
      setWebhookUrl(config.webhookUrl || '');
    }
  }, []);

  const saveConfig = () => {
    const config = {
      slackBotToken,
      parselyApiKey,
      parselyApiSecret,
      parselyDomain,
      webhookUrl
    };
    
    localStorage.setItem('slack-bot-config', JSON.stringify(config));
    
    toast({
      title: "Configuration Saved",
      description: "Your bot configuration has been saved locally for testing.",
    });
  };

  const generateWebhookUrl = () => {
    // For local testing, we'll generate a placeholder URL
    const localUrl = `${window.location.origin}/api/slack-webhook`;
    setWebhookUrl(localUrl);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Slack Configuration</CardTitle>
          <CardDescription>
            Configure your Slack bot token and webhook URL
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slack-token">Slack Bot Token</Label>
            <Input
              id="slack-token"
              type="password"
              placeholder="xoxb-your-slack-bot-token"
              value={slackBotToken}
              onChange={(e) => setSlackBotToken(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhook-url"
                placeholder="https://your-domain.com/api/slack-webhook"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
              <Button onClick={generateWebhookUrl} variant="outline">
                Generate Local
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Use this URL in your Slack app's event subscriptions
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Parsely API Configuration</CardTitle>
          <CardDescription>
            Configure your Parsely API credentials for recrawling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parsely-domain">Parsely Domain</Label>
            <Input
              id="parsely-domain"
              placeholder="your-site.com"
              value={parselyDomain}
              onChange={(e) => setParselyDomain(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="parsely-api-key">Parsely API Key</Label>
            <Input
              id="parsely-api-key"
              type="password"
              placeholder="your-parsely-api-key"
              value={parselyApiKey}
              onChange={(e) => setParselyApiKey(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="parsely-api-secret">Parsely API Secret</Label>
            <Input
              id="parsely-api-secret"
              type="password"
              placeholder="your-parsely-api-secret"
              value={parselyApiSecret}
              onChange={(e) => setParselyApiSecret(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold">1. Create Slack App</h4>
            <p className="text-sm text-muted-foreground">
              Go to api.slack.com/apps and create a new app for your workspace
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">2. Configure Bot Permissions</h4>
            <p className="text-sm text-muted-foreground">
              Add these OAuth scopes: chat:write, channels:history, groups:history
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">3. Event Subscriptions</h4>
            <p className="text-sm text-muted-foreground">
              Enable events and add the webhook URL above. Subscribe to: message.channels, message.groups
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">4. Trigger Phrases</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">recrawl this url</Badge>
              <Badge variant="secondary">please recrawl</Badge>
              <Badge variant="secondary">jumpstart parsely</Badge>
              <Badge variant="secondary">re-crawl</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={saveConfig} className="w-full">
        Save Configuration
      </Button>
    </div>
  );
};