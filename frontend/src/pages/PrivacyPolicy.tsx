import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Database, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Personal information such as name, email address, phone number, and company details when you contact us or request quotes",
        "Technical information including IP address, browser type, and device information when you visit our website",
        "Communication records when you interact with our customer service team",
        "Business information related to your projects and requirements"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "To respond to your inquiries and provide requested information about our products and services",
        "To process quote requests and facilitate business communications",
        "To improve our website functionality and user experience",
        "To send relevant updates about our products and services (with your consent)",
        "To comply with legal obligations and protect our business interests"
      ]
    },
    {
      title: "Information Sharing",
      icon: Shield,
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "Information may be shared with trusted service providers who assist in our operations",
        "We may disclose information when required by law or to protect our rights",
        "Business information may be shared with authorized partners for project collaboration"
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "We implement appropriate technical and organizational security measures",
        "All sensitive data is encrypted during transmission and storage",
        "Access to personal information is restricted to authorized personnel only",
        "Regular security audits and updates are conducted to maintain data protection"
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
            <span className="text-foreground">Privacy Policy</span>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 text-accent mb-4">
              <Shield className="h-5 w-5 electric-glow" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Privacy Policy
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                Your Privacy Matters
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              At Gayatri Electricals & Electronics, we are committed to protecting your privacy and ensuring 
              the security of your personal information. This policy explains how we collect, use, and protect your data.
            </p>
            
            <div className="text-sm text-muted-foreground">
              <p>Last updated: September 22, 2024</p>
            </div>
          </div>

          {/* Privacy Sections */}
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

          {/* Additional Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-card-foreground">Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">You have the right to:</p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Access your personal information</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Request correction of inaccurate data</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Request deletion of your data</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Opt-out of marketing communications</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-card-foreground">Cookies & Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  We use cookies and similar technologies to enhance your browsing experience and analyze website traffic.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Essential cookies for website functionality</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Analytics cookies to improve our services</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>You can control cookies through browser settings</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-card-foreground">Questions About Privacy?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-accent" />
                  <span className="text-sm">gayatrielectronics3@gmail.com</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                We will respond to your privacy-related inquiries within 30 days.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
