import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const SupabaseTest = () => {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<string>('');

  const testConnection = async () => {
    setStatus('testing');
    try {
      // Test basic connection using the REST API status endpoint
      const response = await fetch('https://lvbscdmnsrxxefijlbyw.supabase.co/rest/v1/', {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2YnNjZG1uc3J4eGVmaWpsYnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMzY1OTMsImV4cCI6MjA3MDgxMjU5M30.oM83ycJHSlf4lTUQcwRVhGhMcxNqlLHvCgYgGArR91Q'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        setResult('✅ Supabase connected successfully! Database is ready for development.');
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error: any) {
      setStatus('error');
      setResult(`❌ Connection failed: ${error.message}`);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'testing':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'testing':
        return <Badge variant="secondary">Testing...</Badge>;
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Not Tested</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Supabase Connection Test
        </CardTitle>
        <CardDescription>
          Test the connection to your Supabase project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          {getStatusBadge()}
        </div>
        
        {result && (
          <div className="p-3 rounded-md bg-muted text-sm">
            {result}
          </div>
        )}
        
        <Button 
          onClick={testConnection} 
          disabled={status === 'testing'}
          className="w-full"
        >
          {status === 'testing' ? 'Testing Connection...' : 'Test Connection'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SupabaseTest;