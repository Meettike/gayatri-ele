import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { products, searchProducts } from "@/data/products";

interface ProductSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductSearch = ({ isOpen, onClose }: ProductSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(products);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults(products);
    } else {
      const filtered = searchProducts(searchQuery);
      setSearchResults(filtered);
    }
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
        <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-card-foreground">
                Search Products
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for transformers, servo stabilizers, cables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border focus:border-accent focus:ring-accent"
                autoFocus
              />
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="max-h-[60vh] overflow-y-auto">
              {searchResults.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No products found matching your search.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try searching for "transformers", "stabilizers", or "cables"
                  </p>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {searchResults.map((product) => {
                    const IconComponent = product.icon;
                    return (
                      <Card key={product.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="p-2 bg-gradient-to-br from-accent to-electric rounded-lg flex-shrink-0">
                              <IconComponent className="h-5 w-5 text-accent-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-card-foreground mb-1">
                                    {product.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                    {product.description}
                                  </p>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {product.category}
                                    </Badge>
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {product.features.slice(0, 3).map((feature, index) => (
                                      <span
                                        key={index}
                                        className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                                      >
                                        {feature}
                                      </span>
                                    ))}
                                    {product.features.length > 3 && (
                                      <span className="text-xs text-muted-foreground">
                                        +{product.features.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <Button
                                  asChild
                                  variant="outline"
                                  size="sm"
                                  className="flex-shrink-0"
                                  onClick={onClose}
                                >
                                  <Link to={`/product/${product.slug}`}>
                                    View Details
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductSearch;
