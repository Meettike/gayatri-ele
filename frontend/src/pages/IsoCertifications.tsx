import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Shield, Leaf, Users, Download, Calendar, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const IsoCertifications = () => {
  const certifications = [
    {
      icon: Award,
      standard: "ISO 9001:2015",
      title: "Quality Management Systems",
      description: "Demonstrates our commitment to quality management and customer satisfaction through systematic processes and continuous improvement.",
      scope: "Design, manufacture, and supply of power transformers, distribution transformers, servo stabilizers, and electrical cables",
      validUntil: "March 2026",
      certifyingBody: "Bureau Veritas Certification",
      benefits: [
        "Enhanced customer satisfaction",
        "Improved operational efficiency",
        "Consistent product quality",
        "Reduced waste and rework"
      ]
    },
    {
      icon: Leaf,
      standard: "ISO 14001:2015",
      title: "Environmental Management Systems",
      description: "Reflects our dedication to environmental responsibility and sustainable manufacturing practices.",
      scope: "Environmental management in the manufacturing of electrical equipment and related activities",
      validUntil: "June 2025",
      certifyingBody: "TUV SUD",
      benefits: [
        "Reduced environmental impact",
        "Compliance with environmental regulations",
        "Resource optimization",
        "Sustainable business practices"
      ]
    },
    {
      icon: Shield,
      standard: "ISO 45001:2018",
      title: "Occupational Health & Safety Management",
      description: "Ensures the highest standards of workplace safety and employee health protection.",
      scope: "Occupational health and safety management in manufacturing operations",
      validUntil: "September 2025",
      certifyingBody: "SGS India",
      benefits: [
        "Zero workplace accidents",
        "Employee health protection",
        "Legal compliance",
        "Improved safety culture"
      ]
    },
    {
      icon: Users,
      standard: "ISO 27001:2013",
      title: "Information Security Management",
      description: "Protects our information assets and ensures data security for our customers and stakeholders.",
      scope: "Information security management for business operations and customer data",
      validUntil: "December 2025",
      certifyingBody: "BSI Group",
      benefits: [
        "Data protection",
        "Cyber security",
        "Customer trust",
        "Risk management"
      ]
    }
  ];

  const additionalCertifications = [
    {
      name: "BIS Certification",
      description: "Bureau of Indian Standards certification for electrical equipment",
      status: "Active"
    },
    {
      name: "CE Marking",
      description: "European Conformity marking for export products",
      status: "Active"
    },
    {
      name: "CPRI Approval",
      description: "Central Power Research Institute type test approval",
      status: "Active"
    },
    {
      name: "NABL Accreditation",
      description: "National Accreditation Board for Testing Laboratories",
      status: "Active"
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
            <span className="text-foreground">ISO Certifications</span>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 text-accent mb-4">
              <Award className="h-5 w-5 electric-glow" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                ISO Certifications
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                Certified Excellence
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Our ISO certifications demonstrate our unwavering commitment to quality, environmental responsibility, 
              safety, and information security. These internationally recognized standards validate our systematic 
              approach to excellence.
            </p>
          </div>

          {/* Main Certifications */}
          <section className="mb-16">
            <div className="space-y-8">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon;
                return (
                  <Card key={index} className="hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gradient-to-br from-accent to-electric rounded-lg">
                            <IconComponent className="h-8 w-8 text-accent-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <CardTitle className="text-2xl font-bold text-card-foreground">
                                {cert.standard}
                              </CardTitle>
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Active
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-accent mb-2">{cert.title}</h3>
                            <p className="text-muted-foreground">{cert.description}</p>
                          </div>
                        </div>
                        <Button variant="outline" className="btn-metallic">
                          <Download className="h-4 w-4 mr-2" />
                          Download Certificate
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-2">Scope of Certification</h4>
                            <p className="text-sm text-muted-foreground">{cert.scope}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-card-foreground mb-1">Valid Until</h4>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-accent" />
                                <span className="text-sm text-muted-foreground">{cert.validUntil}</span>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-card-foreground mb-1">Certified By</h4>
                              <p className="text-sm text-muted-foreground">{cert.certifyingBody}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-card-foreground mb-3">Key Benefits</h4>
                          <ul className="space-y-2">
                            {cert.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Additional Certifications */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Certifications & Approvals</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {additionalCertifications.map((cert, index) => (
                <Card key={index} className="hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold text-card-foreground">{cert.name}</CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {cert.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Certification Process */}
          <section className="mb-16">
            <Card className="bg-gradient-to-br from-card to-industrial">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-card-foreground">Our Certification Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-accent to-electric rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-accent-foreground font-bold">1</span>
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">Gap Analysis</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive assessment of current processes against standards</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-accent to-electric rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-accent-foreground font-bold">2</span>
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">Implementation</h3>
                    <p className="text-sm text-muted-foreground">System development and process implementation</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-accent to-electric rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-accent-foreground font-bold">3</span>
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">Audit & Review</h3>
                    <p className="text-sm text-muted-foreground">Internal audits and management review processes</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-accent to-electric rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-accent-foreground font-bold">4</span>
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">Certification</h3>
                    <p className="text-sm text-muted-foreground">External audit and certificate issuance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Commitment Statement */}
          <Card className="mb-16">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-card-foreground">Our Commitment</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                We are committed to maintaining and continuously improving our management systems to ensure 
                they remain effective and aligned with our business objectives. Regular surveillance audits, 
                internal reviews, and management commitment ensure our certifications remain valid and meaningful.
              </p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-card-foreground">Certification Inquiries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                For certificate verification or questions about our certifications, please contact:
              </p>
              <div className="text-sm text-muted-foreground">
                <p>Email: gayatrielectronics3@gmail.com</p>
                <p>Phone: +91 99244 74405</p>
                <p>Quality Manager: Mr. Rajesh Kumar</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IsoCertifications;
