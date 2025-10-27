import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Suspense, lazy } from "react";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ProductCategory = lazy(() => import("./pages/ProductCategory"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const QualityPolicy = lazy(() => import("./pages/QualityPolicy"));
const IsoCertifications = lazy(() => import("./pages/IsoCertifications"));
const QuoteRequest = lazy(() => import("./pages/QuoteRequest"));
const Contact = lazy(() => import("./pages/Contact"));
const News = lazy(() => import("./pages/News"));
const KnowledgeCenter = lazy(() => import("./pages/KnowledgeCenter"));
const SimpleLoadCalculator = lazy(() => import("./pages/SimpleLoadCalculator"));
const SimpleEnergyCalculator = lazy(() => import("./pages/SimpleEnergyCalculator"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/products/:category" element={<ProductCategory />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/quality-policy" element={<QualityPolicy />} />
              <Route path="/iso-certifications" element={<IsoCertifications />} />
              <Route path="/quote-request" element={<QuoteRequest />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news" element={<News />} />
              <Route path="/knowledge-center" element={<KnowledgeCenter />} />
              <Route path="/tools/load-calculator" element={<SimpleLoadCalculator />} />
              <Route path="/tools/efficiency-calculator" element={<SimpleEnergyCalculator />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
