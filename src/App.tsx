import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Index from "./pages/Index";
import DesiDictation from "./pages/DesiDictation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Everything except the router. The browser wraps this in a BrowserRouter
 * (below) and the build-time prerender wraps it in a StaticRouter
 * (entry-server.tsx), so both render the exact same tree and React can
 * hydrate the prerendered HTML instead of redrawing it.
 */
export const AppShell = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/desi-dictation" element={<DesiDictation />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <AppShell>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppShell>
);

export default App;
