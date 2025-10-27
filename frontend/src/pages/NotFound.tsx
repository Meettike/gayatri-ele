import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-6">
          <div className="flex justify-center">
            <AlertTriangle className="h-24 w-24 text-accent electric-glow" />
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-lg text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <Button asChild className="btn-hero">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
