import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Settings, Cog } from "lucide-react";
import { Link } from "react-router-dom";
import TransformerAnimation from "./TransformerAnimation";
import Transformer3DAnimation from "./Transformer3DAnimation";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Transformer Assembly Animation */}
      <Transformer3DAnimation />
      
      {/* Overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/10 to-background/40 z-0"></div>
      
      {/* Additional overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/20 z-0"></div>

      {/* Content */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:py-20">
        <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-accent mt-4 md:mt-0">
                <Settings className="h-5 w-5 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-sm font-semibold tracking-wide uppercase">
                  Industrial Excellence Since 2002
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mt-2 md:mt-0">
                <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
                  Powering
                </span>
                <br />
                <span className="text-accent">Reliability</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Delivering Innovation through precision-engineered transformers, 
                servo stabilizers, and premium electrical solutions for industrial excellence.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-card/80 backdrop-blur-md rounded-lg border border-border/50 shadow-lg">
                <Shield className="h-8 w-8 text-accent electric-glow" />
                <div>
                  <p className="font-semibold text-card-foreground">Reliable</p>
                  <p className="text-sm text-muted-foreground">ISO Certified</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-card/80 backdrop-blur-md rounded-lg border border-border/50 shadow-lg">
                <Cog className="h-8 w-8 text-accent electric-glow" />
                <div>
                  <p className="font-semibold text-card-foreground">Precision</p>
                  <p className="text-sm text-muted-foreground">Engineering</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-card/80 backdrop-blur-md rounded-lg border border-border/50 shadow-lg">
                <Settings className="h-8 w-8 text-accent animate-spin electric-glow" style={{ animationDuration: '6s' }} />
                <div>
                  <p className="font-semibold text-card-foreground">Innovation</p>
                  <p className="text-sm text-muted-foreground">Technology</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="btn-hero group">
                <Link to="/products/transformers">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link to="/quote-request">
                  Request Quote
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Animation */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <TransformerAnimation />
              
              {/* Animation Caption */}
              <div className="text-center mt-8 space-y-2">
                <p className="text-sm font-semibold text-accent">
                  Advanced Transformer Technology
                </p>
                <p className="text-xs text-muted-foreground">
                  Precision-engineered for industrial reliability
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-bounce"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-electric rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-metallic rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
    </section>
  );
};

export default HeroSection;