import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Star, Download, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug } from "@/data/products";
import { openWhatsAppQuote } from "@/utils/whatsapp";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");

  const handleGetQuote = () => {
    if (product) {
      openWhatsAppQuote(product);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = product.icon;

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
            <span className="text-foreground">{product.title}</span>
          </div>

          {/* Back Button */}
          <Button variant="outline" asChild className="mb-8">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="space-y-6">
              <div className="aspect-square bg-gradient-to-br from-industrial to-background rounded-lg border border-border flex items-center justify-center">
                <div className="p-8 bg-gradient-to-br from-accent to-electric rounded-xl shadow-[var(--shadow-glow)]">
                  <IconComponent className="h-32 w-32 text-accent-foreground" />
                </div>
              </div>
              
              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="mr-2 h-5 w-5 text-accent" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="bg-accent/10 text-accent">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-2 text-accent mb-2">
                  <IconComponent className="h-5 w-5" />
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    {product.category.replace('-', ' & ')}
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                    {product.title}
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-6">
                  {product.description}
                </p>
                
                <p className="text-card-foreground leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {/* Key Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-card-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-hero flex-1" onClick={handleGetQuote}>
                  <Phone className="mr-2 h-5 w-5" />
                  Get Quote via WhatsApp
                </Button>
                <Button size="lg" variant="outline" className="btn-metallic flex-1">
                  <Download className="mr-2 h-5 w-5" />
                  Download Specs
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-16" />

          {/* Technical Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
                <CardDescription>Detailed technical parameters and ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="font-medium text-card-foreground">{key}</span>
                      <span className="text-accent font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
                <CardDescription>Industrial and commercial use cases</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.applications.map((application, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-card-foreground">{application}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Available Models */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Available Models</CardTitle>
              <CardDescription>Choose from our range of standard models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {product.models.map((model, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover:border-accent/50 transition-colors">
                    <h4 className="font-semibold text-card-foreground mb-2">{model.name}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><span className="font-medium">Capacity:</span> {model.capacity}</p>
                      <p><span className="font-medium">Voltage:</span> {model.voltage}</p>
                      <p><span className="font-medium">Efficiency:</span> {model.efficiency}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;