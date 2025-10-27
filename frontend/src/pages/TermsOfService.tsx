import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        "By accessing and using our website and services, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, please do not use our services",
        "We reserve the right to modify these terms at any time with notice",
        "Continued use of our services constitutes acceptance of any modifications"
      ]
    },
    {
      title: "Products and Services",
      icon: FileText,
      content: [
        "All product specifications and descriptions are provided for informational purposes",
        "We reserve the right to modify product specifications without prior notice",
        "Availability of products and services may vary by location",
        "Custom solutions are subject to separate agreements and terms"
      ]
    },
    {
      title: "Quotations and Pricing",
      icon: Scale,
      content: [
        "All quotations are valid for 30 days unless otherwise specified",
        "Prices are subject to change without notice until order confirmation",
        "Final pricing may vary based on specifications and requirements",
        "Additional charges may apply for custom modifications or expedited delivery"
      ]
    },
    {
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: [
        "Our liability is limited to the maximum extent permitted by law",
        "We are not liable for indirect, incidental, or consequential damages",
        "Total liability shall not exceed the amount paid for the specific product or service",
        "Some jurisdictions do not allow limitation of liability, so these limits may not apply to you"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Terms of Service</span>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 text-accent mb-4">
              <Scale className="h-5 w-5 electric-glow" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Terms of Service
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                Service Agreement
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              These Terms of Service govern your use of Gayatri Electricals & Electronics' website and services. 
              Please read these terms carefully before using our services.
            </p>
            
            <div className="text-sm text-muted-foreground">
              <p>Last updated: September 22, 2024</p>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8 mb-16">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Card key={index} className="hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-accent to-electric rounded-lg">
                        <IconComponent className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <CardTitle className="text-xl font-bold text-card-foreground">
                        {section.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Terms */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-card-foreground">Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  All content on this website is protected by intellectual property rights:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Trademarks and logos are owned by Gayatri Electricals</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Technical specifications and designs are proprietary</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Unauthorized use is strictly prohibited</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-card-foreground">Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  These terms are governed by applicable laws:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Subject to Indian laws and regulations</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Disputes resolved through arbitration</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Jurisdiction: Local courts where applicable</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Warranty and Support */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-card-foreground">Warranty and Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-card-foreground mb-3">Product Warranty</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Transformers: 2-year comprehensive warranty</span>
                    </li>
                    <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Servo Stabilizers: 1-year warranty</span>
                    </li>
                    <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Cables: 1-year manufacturing defect warranty</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-3">Support Services</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>24/7 technical support hotline</span>
                    </li>
                    <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>On-site installation and commissioning</span>
                    </li>
                    <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Preventive maintenance programs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-card-foreground">Questions About Terms?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact our legal team:
              </p>
              <div className="text-sm text-muted-foreground">
                <p>Email: gayatrielectronics3@gmail.com</p>
                <p>Phone: +91 98246 20304</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
