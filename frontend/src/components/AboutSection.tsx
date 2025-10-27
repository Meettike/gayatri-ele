import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Wrench, Globe, Zap } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { icon: Award, value: "25+", label: "Years Experience" },
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: Wrench, value: "1000+", label: "Projects Completed" },
    { icon: Globe, value: "50+", label: "Cities Served" }
  ];

  const values = [
    {
      icon: Award,
      title: "Quality Assurance",
      description: "ISO certified manufacturing processes ensuring every product meets international standards"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge technology and continuous R&D for next-generation electrical solutions"
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Dedicated support team providing comprehensive service from design to installation"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-industrial to-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-accent">
                <Zap className="h-5 w-5 electric-glow" />
                <span className="text-sm font-semibold tracking-wide uppercase">
                  About Gayatri Electricals
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                  Engineering Excellence
                </span>
                <br />
                <span className="text-accent">Since Decades</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Gayatri Electricals and Electronics has been at the forefront of electrical engineering, 
                manufacturing world-class transformers, servo stabilizers, and supplying premium wires 
                and cables to industries across the nation.
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-muted-foreground">
                Our commitment to precision engineering and innovative solutions has made us a trusted 
                partner for industrial clients who demand reliability, efficiency, and performance in 
                their electrical infrastructure.
              </p>
              
              <p className="text-muted-foreground">
                With state-of-the-art manufacturing facilities and a team of experienced engineers, 
                we deliver custom solutions that meet the most challenging industrial requirements.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-4">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-gradient-to-br from-accent to-electric rounded-lg electric-glow">
                      <IconComponent className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card 
                    key={index}
                    className="text-center p-6 bg-card/80 backdrop-blur-sm border-border hover:border-accent/50 hover:shadow-[var(--shadow-glow)] transition-all duration-300"
                  >
                    <CardContent className="p-0 space-y-4">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent to-electric rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-accent-foreground" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-accent electric-glow">{stat.value}</div>
                        <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Certifications */}
            <Card className="p-6 bg-gradient-to-br from-card to-industrial border-border">
              <CardContent className="p-0 space-y-4">
                <h3 className="text-xl font-bold text-card-foreground">Certifications & Standards</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">ISO 9001:2015</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">IS 1180</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">IEC Standards</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">BIS Certified</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;