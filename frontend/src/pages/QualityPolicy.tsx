import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Target, Users, Cog, CheckCircle, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const QualityPolicy = () => {
  const qualityPrinciples = [
    {
      icon: Target,
      title: "Customer Focus",
      description: "We prioritize customer satisfaction by understanding and exceeding their expectations through superior product quality and service excellence."
    },
    {
      icon: Users,
      title: "Employee Engagement",
      description: "Our skilled workforce is our greatest asset. We invest in continuous training and development to maintain the highest standards of craftsmanship."
    },
    {
      icon: Cog,
      title: "Process Excellence",
      description: "We follow systematic processes and best practices to ensure consistent quality in every product we manufacture and deliver."
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description: "We are committed to continuous improvement through regular audits, feedback analysis, and implementation of innovative solutions."
    }
  ];

  const certifications = [
    {
      name: "ISO 9001:2015",
      description: "Quality Management Systems",
      scope: "Design, manufacture and supply of transformers, servo stabilizers, and electrical equipment"
    },
    {
      name: "ISO 14001:2015",
      description: "Environmental Management Systems",
      scope: "Environmental compliance in manufacturing processes"
    },
    {
      name: "OHSAS 18001",
      description: "Occupational Health & Safety",
      scope: "Workplace safety and employee health management"
    },
    {
      name: "BIS Certification",
      description: "Bureau of Indian Standards",
      scope: "Product quality and safety standards compliance"
    }
  ];

  const qualityObjectives = [
    "Achieve zero defect manufacturing through robust quality control processes",
    "Maintain customer satisfaction rating above 95% through superior service delivery",
    "Ensure 100% compliance with applicable regulatory and statutory requirements",
    "Reduce product development cycle time by 20% through process optimization",
    "Achieve 99.5% on-time delivery performance for all customer orders",
    "Maintain supplier quality rating above 98% through effective vendor management"
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
            <span className="text-foreground">Quality Policy</span>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 text-accent mb-4">
              <Award className="h-5 w-5 electric-glow" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Quality Policy
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                Excellence in Every Product
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              At Gayatri Electricals & Electronics, quality is not just a commitment—it's our foundation. 
              We are dedicated to delivering products and services that exceed expectations and set industry standards.
            </p>
          </div>

          {/* Quality Statement */}
          <Card className="mb-16 bg-gradient-to-br from-card to-industrial">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-card-foreground">Our Quality Commitment</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                "We are committed to providing high-quality electrical equipment and solutions that meet or exceed customer expectations. 
                Through continuous improvement, innovation, and adherence to international standards, we strive to be the preferred 
                partner for all electrical engineering needs while ensuring environmental sustainability and workplace safety."
              </p>
              <div className="mt-6 text-sm text-muted-foreground">
                <p className="font-semibold">- Management Team, Gayatri Electricals & Electronics</p>
              </div>
            </CardContent>
          </Card>

          {/* Quality Principles */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Quality Principles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {qualityPrinciples.map((principle, index) => {
                const IconComponent = principle.icon;
                return (
                  <Card key={index} className="hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-br from-accent to-electric rounded-lg">
                          <IconComponent className="h-6 w-6 text-accent-foreground" />
                        </div>
                        <CardTitle className="text-xl font-bold text-card-foreground">
                          {principle.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Quality Objectives */}
          <section className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-card-foreground text-center">Quality Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {qualityObjectives.map((objective, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{objective}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Certifications */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Certifications</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-accent to-electric rounded-lg">
                        <Award className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-card-foreground">{cert.name}</CardTitle>
                        <p className="text-sm text-accent">{cert.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{cert.scope}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quality Process */}
          <section className="mb-16">
            <Card className="bg-gradient-to-br from-card to-industrial">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-card-foreground">Our Quality Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-accent to-electric rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-accent-foreground font-bold">1</span>
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">Design Review</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive design validation and approval process</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-accent to-electric rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-accent-foreground font-bold">2</span>
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">Material Inspection</h3>
                    <p className="text-sm text-muted-foreground">Rigorous incoming material quality verification</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-accent to-electric rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-accent-foreground font-bold">3</span>
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">Production Control</h3>
                    <p className="text-sm text-muted-foreground">In-process quality monitoring and control</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-accent to-electric rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-accent-foreground font-bold">4</span>
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">Final Testing</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive testing before product delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Contact Section */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-card-foreground">Quality Assurance Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                For quality-related inquiries, feedback, or concerns, please contact our Quality Assurance team:
              </p>
              <div className="text-sm text-muted-foreground">
                <p>Email: gayatrielectronics3@gmail.com</p>
                <p>Phone: +91 99244 74405</p>
                <p>Quality Manager: Mr. Rajesh Kumar</p>
              </div>
              <p className="text-xs text-muted-foreground">
                We are committed to addressing all quality concerns within 24 hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QualityPolicy;
