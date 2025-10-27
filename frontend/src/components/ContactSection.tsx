import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock, Zap, Send } from "lucide-react";
import { ContactService, ApiUtils } from "@/services/api";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    productInterest: "",
    projectDetails: ""
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
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.projectDetails) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (marked with *).",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate email format
      if (!ApiUtils.isValidEmail(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Prepare contact data
      const contactData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.companyName,
        subject: formData.productInterest || "General Inquiry",
        message: formData.projectDetails
      };

      // Submit to API
      await ContactService.submitContactForm(contactData);
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        productInterest: "",
        projectDetails: ""
      });
    } catch (error) {
      const errorMessage = ApiUtils.formatErrorMessage(error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: "Industrial Area, Phase-II\nSector 12, Manufacturing Hub\nCity - 400001"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+91 98246 20304\n+91 99244 74405\n+91 97252 53548"
    },
    {
      icon: Mail,
      title: "Email",
      details: "gayatrielectronics3@gmail.com"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Sat: 9:00 AM - 6:00 PM\nSun: Closed"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-background to-industrial">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-accent mb-4">
            <Zap className="h-5 w-5 electric-glow" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              Get In Touch
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              Let's Power Your Project
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to discuss your electrical equipment needs? Our team of experts is here to provide 
            custom solutions for your industrial requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-accent/50 hover:shadow-[var(--shadow-glow)] transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-br from-accent to-electric rounded-lg">
                        <IconComponent className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground mb-2">{info.title}</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{info.details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-card-foreground">
                  Request a Quote
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-card-foreground">
                          Full Name *
                        </label>
                        <Input 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="bg-input border-border focus:border-accent focus:ring-accent"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-card-foreground">
                          Company Name
                        </label>
                        <Input 
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Enter your company name"
                          className="bg-input border-border focus:border-accent focus:ring-accent"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-card-foreground">
                          Email Address *
                        </label>
                        <Input 
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="bg-input border-border focus:border-accent focus:ring-accent"
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
                          className="bg-input border-border focus:border-accent focus:ring-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">
                        Product Interest
                      </label>
                      <select 
                        name="productInterest"
                        value={formData.productInterest}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-input border border-border rounded-md focus:border-accent focus:ring-accent focus:ring-1 text-foreground"
                      >
                        <option value="">Select a product category</option>
                        <option value="transformers">Transformers</option>
                        <option value="servo-stabilizers">Servo Stabilizers</option>
                        <option value="wires-cables">Wires & Cables</option>
                        <option value="custom">Custom Solution</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">
                        Project Details *
                      </label>
                      <Textarea 
                        name="projectDetails"
                        value={formData.projectDetails}
                        onChange={handleInputChange}
                        placeholder="Please describe your requirements, specifications, and any specific needs..."
                        rows={4}
                        className="bg-input border-border focus:border-accent focus:ring-accent resize-none"
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
                  </div>
                </form>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;