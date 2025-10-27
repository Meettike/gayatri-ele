import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Calculator, FileText, Send, CheckCircle, Clock, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { QuoteService, ApiUtils, QuoteRequestData } from "@/services/api";

const QuoteRequest = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    designation: "",
    
    // Project Details
    projectName: "",
    projectLocation: "",
    productCategory: "",
    quantity: "",
    specifications: "",
    timeline: "",
    budget: "",
    
    // Technical Requirements
    voltage: "",
    frequency: "",
    capacity: "",
    specialRequirements: "",
    
    // Additional Information
    installationRequired: false,
    maintenanceContract: false,
    urgentQuote: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.productCategory || !formData.specifications) {
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
      });
      return;
    }

    setIsSubmitting(true);
    
    // Show loading toast
    const loadingToast = toast({
      title: "Submitting Quote Request...",
      description: "Please wait while we process your request.",
      duration: 0, // Don't auto-dismiss
    });
    
    try {
      const quoteRequestData: QuoteRequestData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone || "",
        company: formData.companyName || "",
        location: formData.projectLocation || "",
        productType: formData.productCategory as 'transformers' | 'servo-stabilizers' | 'wires-cables' | 'other',
        specifications: formData.specifications,
        quantity: formData.quantity || "",
        budgetRange: formData.budget as 'under-1-lakh' | '1-5-lakh' | '5-25-lakh' | '25-lakh-plus' | 'not-specified' || 'not-specified',
        timeline: formData.timeline as 'immediate' | '1-month' | '3-months' | '6-months' | 'flexible' || 'flexible',
        additionalRequirements: `
          Project: ${formData.projectName || 'N/A'}
          Designation: ${formData.designation || 'N/A'}
          Voltage: ${formData.voltage || 'N/A'}
          Frequency: ${formData.frequency || 'N/A'}
          Capacity: ${formData.capacity || 'N/A'}
          Special Requirements: ${formData.specialRequirements || 'N/A'}
          Installation Required: ${formData.installationRequired ? 'Yes' : 'No'}
          Maintenance Contract: ${formData.maintenanceContract ? 'Yes' : 'No'}
          Urgent Quote: ${formData.urgentQuote ? 'Yes' : 'No'}
        `.trim()
      };

      await QuoteService.submitQuoteRequest(quoteRequestData);

      // If we reach here, the request was successful (no exception thrown)
      loadingToast.dismiss();
      toast({
        title: "Quote Request Submitted!",
        description: "We'll prepare your detailed quote and send it within 24 hours.",
        duration: 4000, // Auto-dismiss after 4 seconds
      });

      // Reset form
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        designation: "",
        projectName: "",
        projectLocation: "",
        productCategory: "",
        quantity: "",
        specifications: "",
        timeline: "",
        budget: "",
        voltage: "",
        frequency: "",
        capacity: "",
        specialRequirements: "",
        installationRequired: false,
        maintenanceContract: false,
        urgentQuote: false
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Quote request error:", error);
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

  const productCategories = [
    { value: "transformers", label: "Transformers" },
    { value: "servo-stabilizers", label: "Servo Stabilizers" },
    { value: "wires-cables", label: "Wires & Cables" },
    { value: "other", label: "Other / Custom Solution" }
  ];

  const timelineOptions = [
    { value: "immediate", label: "Immediate (Within 1 week)" },
    { value: "1-month", label: "Within 1 Month" },
    { value: "3-months", label: "Within 3 Months" },
    { value: "6-months", label: "Within 6 Months" },
    { value: "flexible", label: "Flexible Timeline" }
  ];

  const budgetOptions = [
    { value: "under-1-lakh", label: "Under ₹1 Lakh" },
    { value: "1-5-lakh", label: "₹1-5 Lakhs" },
    { value: "5-25-lakh", label: "₹5-25 Lakhs" },
    { value: "25-lakh-plus", label: "₹25 Lakhs+" },
    { value: "not-specified", label: "Prefer not to specify" }
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
            <span className="text-foreground">Request Quote</span>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 text-accent mb-4">
              <Calculator className="h-5 w-5 electric-glow" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Request Quote
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                Get Your Custom Quote
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Tell us about your project requirements and we'll provide you with a detailed, 
              competitive quote tailored to your specific needs.
            </p>
          </div>

          {/* Quote Process */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-accent to-electric rounded-lg w-fit">
                  <FileText className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">1. Submit Requirements</h3>
                <p className="text-sm text-muted-foreground">Fill out the detailed form with your project specifications</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-accent to-electric rounded-lg w-fit">
                  <Clock className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">2. Technical Review</h3>
                <p className="text-sm text-muted-foreground">Our engineers analyze your requirements and prepare the quote</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-accent to-electric rounded-lg w-fit">
                  <CheckCircle className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">3. Receive Quote</h3>
                <p className="text-sm text-muted-foreground">Get your detailed quote within 24 hours via email</p>
              </CardContent>
            </Card>
          </div>

          {/* Quote Form */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-card-foreground">
                Quote Request Form
              </CardTitle>
              <CardDescription>
                Please provide as much detail as possible for an accurate quote
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-accent" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Full Name *</label>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Company Name *</label>
                      <Input
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Email Address *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Phone Number *</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-card-foreground">Designation</label>
                      <Input
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        placeholder="Your job title/designation"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-accent" />
                    Project Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Project Name</label>
                      <Input
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        placeholder="Name of your project"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Project Location</label>
                      <Input
                        name="projectLocation"
                        value={formData.projectLocation}
                        onChange={handleInputChange}
                        placeholder="City, State"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Product Category *</label>
                      <select
                        name="productCategory"
                        value={formData.productCategory}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-input border border-border rounded-md focus:border-accent focus:ring-accent focus:ring-1 text-foreground"
                        required
                      >
                        <option value="">Select product category</option>
                        {productCategories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Quantity</label>
                      <Input
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="Number of units required"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Timeline *</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-input border border-border rounded-md focus:border-accent focus:ring-accent focus:ring-1 text-foreground"
                        required
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-input border border-border rounded-md focus:border-accent focus:ring-accent focus:ring-1 text-foreground"
                      >
                        <option value="">Select budget range</option>
                        {budgetOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Technical Specifications</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Voltage</label>
                      <Input
                        name="voltage"
                        value={formData.voltage}
                        onChange={handleInputChange}
                        placeholder="e.g., 415V, 11kV"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Frequency</label>
                      <Input
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleInputChange}
                        placeholder="e.g., 50Hz"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Capacity</label>
                      <Input
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        placeholder="e.g., 100KVA, 500KVA"
                      />
                    </div>
                  </div>
                </div>

                {/* Detailed Specifications */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Detailed Specifications *</label>
                  <Textarea
                    name="specifications"
                    value={formData.specifications}
                    onChange={handleInputChange}
                    placeholder="Please provide detailed specifications, standards to be followed, environmental conditions, special requirements, etc."
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Special Requirements</label>
                  <Textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    placeholder="Any special requirements, certifications needed, testing requirements, etc."
                    rows={3}
                  />
                </div>

                {/* Additional Services */}
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Additional Services</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="installationRequired"
                        checked={formData.installationRequired}
                        onChange={handleInputChange}
                        className="rounded border-border text-accent focus:ring-accent"
                      />
                      <span className="text-sm text-card-foreground">Installation & Commissioning Required</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="maintenanceContract"
                        checked={formData.maintenanceContract}
                        onChange={handleInputChange}
                        className="rounded border-border text-accent focus:ring-accent"
                      />
                      <span className="text-sm text-card-foreground">Annual Maintenance Contract (AMC)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="urgentQuote"
                        checked={formData.urgentQuote}
                        onChange={handleInputChange}
                        className="rounded border-border text-accent focus:ring-accent"
                      />
                      <span className="text-sm text-card-foreground">Urgent Quote Required (Within 4 hours)</span>
                      <Badge variant="secondary" className="text-xs">Additional charges may apply</Badge>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-hero"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Quote Request...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Quote Request
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our{" "}
                  <Link to="/privacy-policy" className="text-accent hover:underline">
                    privacy policy
                  </Link>{" "}
                  and{" "}
                  <Link to="/terms-of-service" className="text-accent hover:underline">
                    terms of service
                  </Link>
                  .
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuoteRequest;
