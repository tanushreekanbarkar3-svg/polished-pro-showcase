import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// GitHub Pages SPA support
const basename = import.meta.env.PROD ? '/portfolio-tk' : '';

// Handle GitHub Pages routing
if (import.meta.env.PROD && window.location.search.includes('/?/')) {
  const params = window.location.search.slice(1).split('&');
  const route = params.find(p => p.startsWith('/')); 
  if (route) {
    const newPath = route.replace(/~and~/g, '&');
    window.history.replaceState(null, '', basename + newPath + window.location.hash);
  }
}
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
