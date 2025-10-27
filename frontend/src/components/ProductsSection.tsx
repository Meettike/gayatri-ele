import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Settings, Cable, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProductsSection = () => {
  const products = [
    {
      icon: Zap,
      title: "Transformers",
      slug: "transformers",
      description: "High-efficiency power transformers engineered for industrial applications",
      features: [
        "Power Transformers",
        "Auto Transformers",
        "Isolation Transformers",
        "Custom Transformers"
      ],
      specs: "5KVA to 5000KVA"
    },
    {
      icon: Settings,
      title: "Servo Stabilizers",
      slug: "servo-stabilizers",
      description: "Precision voltage regulation systems for sensitive equipment protection",
      features: [
        "Single Phase Stabilizers",
        "Three Phase Stabilizers",
        "Oil Cooled Stabilizers",
        "Air Cooled Stabilizers"
      ],
      specs: "1KVA to 5000KVA"
    },
    {
      icon: Cable,
      title: "Wires & Cables",
      slug: "wires-cables",
      description: "Premium quality electrical cables for diverse industrial applications",
      features: [
        "Power Cables",
        "Control Cables", 
        "Instrumentation Cables",
        "Specialized Cables"
      ],
      specs: "All Standard Sizes"
    }
  ];

  return (
    <section id="products" className="py-24 bg-gradient-to-br from-background via-industrial to-background">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-accent mb-4">
            <Zap className="h-5 w-5 electric-glow" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              Our Products
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              Engineered for Excellence
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive range of electrical equipment designed to meet the most demanding industrial requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:scale-105 bg-card/80 backdrop-blur-sm border-border hover:border-accent/50"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-accent to-electric rounded-xl group-hover:shadow-[var(--shadow-electric)] transition-all duration-300">
                    <IconComponent className="h-8 w-8 text-accent-foreground" />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-card-foreground group-hover:text-accent transition-colors">
                    {product.title}
                  </CardTitle>
                  
                  <CardDescription className="text-muted-foreground">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-card-foreground text-sm uppercase tracking-wide">
                      Product Range
                    </h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className="flex items-center space-x-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-card-foreground">Capacity Range</span>
                      <span className="text-sm text-accent font-medium">{product.specs}</span>
                    </div>
                    
                    <Button 
                      asChild
                      className="w-full btn-metallic group"
                      variant="outline"
                    >
                      <Link to={`/products/${product.slug}`}>
                        View All {product.title}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="btn-hero" asChild>
            <Link to="/products/transformers">
              View All Products
            </Link>
          </Button>
        </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;