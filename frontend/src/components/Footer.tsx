import { Zap, MapPin, Phone, Mail } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { scrollToSection } from "@/utils/scroll";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionClick = (sectionId: string) => {
    if (location.pathname === '/') {
      // Already on homepage, just scroll
      scrollToSection(sectionId);
    } else {
      // Navigate to homepage first, then scroll
      navigate('/');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  };
  return (
    <footer className="bg-background/95 backdrop-blur-md border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-electric to-accent rounded-lg electric-glow">
                <Zap className="h-8 w-8 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  Gayatri Electricals
                </h3>
                <p className="text-sm text-muted-foreground">& Electronics</p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Powering Reliability, Delivering Innovation. Your trusted partner for 
              precision-engineered electrical solutions that meet the most demanding 
              industrial requirements.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm">Industrial Area, Phase-II, Sector 12, Manufacturing Hub</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-sm">+91 98246 20304</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm">gayatrielectronics3@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Products</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products/transformers" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Power Transformers
                </Link>
              </li>
              <li>
                <Link to="/products/transformers" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Distribution Transformers
                </Link>
              </li>
              <li>
                <Link to="/products/servo-stabilizers" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Servo Stabilizers
                </Link>
              </li>
              <li>
                <Link to="/products/wires-cables" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Industrial Cables
                </Link>
              </li>
              <li>
                <Link to="/products/wires-cables" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Control Wires
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Company</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleSectionClick('about')}
                  className="text-muted-foreground hover:text-accent transition-colors text-sm text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionClick('products')}
                  className="text-muted-foreground hover:text-accent transition-colors text-sm text-left"
                >
                  Our Products
                </button>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/quality-policy" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Quality Policy
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  News & Updates
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Gayatri Electricals and Electronics. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link to="/iso-certifications" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                ISO Certifications
              </Link>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground italic">
              "Powering Reliability, Delivering Innovation"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;