import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SlackBotConfig } from '@/components/SlackBotConfig';
import { UrlExtractorTest } from '@/components/UrlExtractorTest';
import { ParselyApiTest } from '@/components/ParselyApiTest';
import { SlackMessageSimulator } from '@/components/SlackMessageSimulator';
import SupabaseTest from '@/components/SupabaseTest';

const SlackBot = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Slack Parsely Recrawl Bot</CardTitle>
            <CardDescription>
              Automatically extract URLs from Slack messages and trigger Parsely recrawls
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="config" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="extractor">URL Extractor</TabsTrigger>
            <TabsTrigger value="parsely">Parsely API</TabsTrigger>
            <TabsTrigger value="simulator">Full Test</TabsTrigger>
            <TabsTrigger value="supabase">Supabase</TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-4">
            <SlackBotConfig />
          </TabsContent>

          <TabsContent value="extractor" className="space-y-4">
            <UrlExtractorTest />
          </TabsContent>

          <TabsContent value="parsely" className="space-y-4">
            <ParselyApiTest />
          </TabsContent>

          <TabsContent value="simulator" className="space-y-4">
            <SlackMessageSimulator />
          </TabsContent>

          <TabsContent value="supabase" className="space-y-4">
            <SupabaseTest />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SlackBot;