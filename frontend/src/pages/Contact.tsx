import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Navigation, Building } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ContactService, ApiUtils } from "@/services/api";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 4000, // Auto-dismiss after 4 seconds
      });
      return;
    }

    // Validate email format
    if (!ApiUtils.isValidEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 4000, // Auto-dismiss after 4 seconds
      });
      return;
    }

    // Validate phone if provided
    if (formData.phone && !ApiUtils.isValidPhone(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Show loading toast
    const loadingToast = toast({
      title: "Sending Message...",
      description: "Please wait while we process your request.",
      duration: 0, // Don't auto-dismiss
    });
    
    try {
      await ContactService.submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        subject: formData.subject || "General Inquiry",
        message: formData.message
      });

      // Dismiss loading toast and show success
      loadingToast.dismiss();
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        duration: 4000, // Auto-dismiss after 4 seconds
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Contact form error:", error);
      }
      
      // Dismiss loading toast and show error
      loadingToast.dismiss();
      toast({
        title: "Error",
        description: ApiUtils.formatErrorMessage(error),
        variant: "destructive",
        duration: 6000, // Auto-dismiss after 6 seconds (longer for errors)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Head Office",
      details: [
        "Gayatri Electricals & Electronics",
        "Industrial Area, Phase-II",
        "Sector 12, Manufacturing Hub",
        "City - 400001, State, India"
      ]
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "Sales: +91 98246 20304",
        "General: +91 99244 74405", 
        "Support: +91 97252 53548"
      ]
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "General: gayatrielectronics3@gmail.com",
        "Sales: gayatrielectronics3@gmail.com",
        "Support: gayatrielectronics3@gmail.com"
      ]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed",
        "Emergency Support: 24/7"
      ]
    }
  ];

  const departments = [
    {
      name: "Sales Department",
      email: "gayatrielectronics3@gmail.com",
      phone: "+91 98246 20304",
      description: "Product inquiries, quotations, and new orders"
    },
    {
      name: "Technical Support",
      email: "gayatrielectronics3@gmail.com",
      phone: "+91 97252 53548",
      description: "Installation support, troubleshooting, and maintenance"
    },
    {
      name: "General Inquiries",
      email: "gayatrielectronics3@gmail.com",
      phone: "+91 99244 74405",
      description: "General questions and business inquiries"
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
            <span className="text-foreground">Contact Us</span>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 text-accent mb-4">
              <MessageSquare className="h-5 w-5 electric-glow" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Contact Us
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Have questions about our products or services? Need technical support? 
              We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-3 p-3 bg-gradient-to-br from-accent to-electric rounded-lg w-fit">
                      <IconComponent className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-lg font-bold text-card-foreground">
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-card-foreground">
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">
                      Company (Optional)
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">
                      Subject
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your inquiry in detail..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-hero"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Department Contacts */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Department Contacts</h3>
                <p className="text-muted-foreground mb-6">
                  For specific inquiries, you can directly contact the relevant department:
                </p>
              </div>

              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-gradient-to-br from-accent to-electric rounded-lg flex-shrink-0">
                          <Building className="h-4 w-4 text-accent-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-card-foreground mb-1">
                            {dept.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {dept.description}
                          </p>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <Mail className="h-3 w-3 text-accent" />
                              <span>{dept.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <Phone className="h-3 w-3 text-accent" />
                              <span>{dept.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-card to-industrial">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-card-foreground">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/quote-request">
                      <Navigation className="mr-2 h-4 w-4" />
                      Request a Quote
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href="tel:+919824620304">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Sales Team
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-card-foreground">
                Visit Our Office
              </CardTitle>
              <CardDescription>
                Our head office and manufacturing facility location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-8 text-center">
                <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Interactive Map Coming Soon
                </h3>
                <p className="text-muted-foreground mb-4">
                  We're working on integrating an interactive map to help you find us easily.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium">Current Address:</p>
                  <p>Industrial Area, Phase-II, Sector 12, Manufacturing Hub</p>
                  <p>City - 400001, State, India</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
