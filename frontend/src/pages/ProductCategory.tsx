import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductsByCategory, productCategories } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductCategory = () => {
  const { category } = useParams();
  const products = getProductsByCategory(category || "");
  const categoryInfo = productCategories.find(cat => cat.id === category);

  if (!categoryInfo || products.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-8">The product category you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#products" className="hover:text-accent transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground">{categoryInfo.title}</span>
          </div>

          {/* Back Button */}
          <Button variant="outline" asChild className="mb-8">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          {/* Category Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                {categoryInfo.title}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {categoryInfo.description}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => {
              const IconComponent = product.icon;
              return (
                <Card 
                  key={product.id} 
                  className="group hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:scale-105 bg-card/80 backdrop-blur-sm border-border hover:border-accent/50"
                >
                  <CardHeader className="text-center">
                    {/* Product Image */}
                    <div className="mx-auto mb-4 w-full h-48 bg-gradient-to-br from-muted/20 to-muted/10 rounded-xl overflow-hidden group-hover:shadow-[var(--shadow-electric)] transition-all duration-300">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to icon if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      {/* Fallback icon */}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent to-electric" style={{ display: product.images && product.images.length > 0 ? 'none' : 'flex' }}>
                        <IconComponent className="h-12 w-12 text-accent-foreground" />
                      </div>
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
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {product.features.slice(0, 3).map((feature, featureIndex) => (
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
                        <span className="text-sm text-accent font-medium">
                          {product.specifications["Capacity Range"] || "Various"}
                        </span>
                      </div>
                      
                      <Button 
                        asChild
                        className="w-full btn-metallic group"
                        variant="outline"
                      >
                        <Link to={`/product/${product.slug}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductCategory;