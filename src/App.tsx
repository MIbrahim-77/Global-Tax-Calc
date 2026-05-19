import { Switch, Route, Router as WouterRouter } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import Home from "@/pages/Home";
import ToolsIndex from "@/pages/ToolsIndex";
import ToolPage from "@/pages/ToolPage";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";
import ComparePage from "@/pages/ComparePage";
import CompareDetail from "@/pages/CompareDetail";
import About from "@/pages/About";
import Disclaimer from "@/pages/Disclaimer";
import Privacy from "@/pages/Privacy";
import Contact from "@/pages/Contact";
import BestTaxSoftware from "@/pages/BestTaxSoftware";
import CountryPage from "@/pages/CountryPage";
import RefundEstimator from "@/pages/RefundEstimator";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/tools" component={ToolsIndex} />
          <Route path="/tools/:slug" component={ToolPage} />
          <Route path="/blog" component={BlogIndex} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/compare" component={ComparePage} />
          <Route path="/compare/:slug" component={CompareDetail} />
          <Route path="/about" component={About} />
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/contact" component={Contact} />
          <Route path="/best-tax-software" component={BestTaxSoftware} />
          <Route path="/refund-estimator" component={RefundEstimator} />
          <Route path="/terms" component={Terms} />
          <Route path="/uk" component={() => <CountryPage />} />
          <Route path="/usa" component={() => <CountryPage />} />
          <Route path="/canada" component={() => <CountryPage />} />
          <Route path="/australia" component={() => <CountryPage />} />
          <Route path="/germany" component={() => <CountryPage />} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
        <CookieBanner />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
