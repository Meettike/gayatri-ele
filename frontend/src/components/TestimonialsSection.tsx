import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Building, User } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Sharma",
      position: "Plant Manager",
      company: "Steel Industries Ltd.",
      rating: 5,
      content: "Gayatri Electricals has been our trusted partner for over 5 years. Their transformers have never failed us, and their after-sales service is exceptional. The quality and reliability of their products have significantly improved our operational efficiency.",
      image: "/api/placeholder/60/60"
    },
    {
      name: "Priya Patel",
      position: "Electrical Engineer",
      company: "Metro Construction",
      rating: 5,
      content: "We've used their servo stabilizers across multiple projects. The precision and build quality are outstanding. Their technical team provided excellent support during installation and commissioning. Highly recommended for industrial applications.",
      image: "/api/placeholder/60/60"
    },
    {
      name: "Amit Kumar",
      position: "Operations Director",
      company: "Textile Mills Group",
      rating: 5,
      content: "The custom transformer solution they provided for our textile mill exceeded our expectations. The energy efficiency improvements have resulted in significant cost savings. Their engineering team understood our requirements perfectly.",
      image: "/api/placeholder/60/60"
    },
    {
      name: "Dr. Sunita Verma",
      position: "Chief Engineer",
      company: "Research Institute",
      rating: 5,
      content: "For our sensitive laboratory equipment, we needed precise voltage regulation. Their servo stabilizers have maintained perfect voltage stability for over 3 years. The investment has paid for itself through equipment protection alone.",
      image: "/api/placeholder/60/60"
    },
    {
      name: "Vikram Singh",
      position: "Facility Manager",
      company: "Manufacturing Hub",
      rating: 5,
      content: "From initial consultation to final installation, the entire process was seamless. Their cables and wiring solutions have proven to be extremely durable and reliable. Zero failures in 4 years of operation.",
      image: "/api/placeholder/60/60"
    },
    {
      name: "Meera Joshi",
      position: "Project Manager",
      company: "Infrastructure Pvt Ltd",
      rating: 5,
      content: "Working with Gayatri Electricals on our infrastructure project was a great experience. They delivered on time, within budget, and the quality exceeded our specifications. Their technical expertise is unmatched.",
      image: "/api/placeholder/60/60"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-industrial to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-accent mb-4">
            <Quote className="h-5 w-5 electric-glow" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              Client Testimonials
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders say about our products and services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:scale-105 bg-card/80 backdrop-blur-sm border-border hover:border-accent/50"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-electric rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-accent">
                      {testimonial.position}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Building className="h-3 w-3" />
                      <span>{testimonial.company}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">500+</div>
            <div className="text-muted-foreground">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">15+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">1000+</div>
            <div className="text-muted-foreground">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">99.8%</div>
            <div className="text-muted-foreground">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
