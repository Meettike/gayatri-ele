import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import AboutSection from "@/components/AboutSection";
import PartnersSection from "@/components/PartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ElectricalBackground } from "@/components/ElectricAnimation";
import { handleHashNavigation } from "@/utils/scroll";

const Index = () => {
  useEffect(() => {
    // Handle hash navigation when component mounts
    handleHashNavigation();
  }, []);
  return (
    <div className="min-h-screen bg-background relative">
      {/* Electrical Background Animation */}
      <ElectricalBackground />
      
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <AboutSection />
        <PartnersSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
