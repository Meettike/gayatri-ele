import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, Hexagon, Settings, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductSearch from "./ProductSearch";
import { useTheme } from "@/contexts/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on the home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border w-full min-w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative p-2 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-electric to-primary rounded-xl opacity-20"></div>
              <div className="relative flex items-center justify-center">
                <Hexagon className="h-6 w-6 text-accent-foreground absolute" />
                <Settings className="h-4 w-4 text-background animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Gayatri Electricals
              </h1>
              <p className="text-sm text-muted-foreground">& Electronics</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-foreground hover:text-accent transition-colors"
            >
              Home
            </button>
            <div className="relative group">
              <button 
                onClick={() => scrollToSection('products')} 
                className="text-foreground hover:text-accent transition-colors"
              >
                Products
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-4">
                  <Link to="/products/transformers" className="block py-2 text-card-foreground hover:text-accent transition-colors">
                    Transformers
                  </Link>
                  <Link to="/products/servo-stabilizers" className="block py-2 text-card-foreground hover:text-accent transition-colors">
                    Servo Stabilizers
                  </Link>
                  <Link to="/products/wires-cables" className="block py-2 text-card-foreground hover:text-accent transition-colors">
                    Wires & Cables
                  </Link>
                </div>
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-foreground hover:text-accent transition-colors"
            >
              About Us
            </button>
            <Link to="/knowledge-center" className="text-foreground hover:text-accent transition-colors">
              Knowledge Center
            </Link>
            <Link to="/contact" className="text-foreground hover:text-accent transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search, Theme Toggle and CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSearch}
              className="border-border hover:border-accent"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="border-border hover:border-accent"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button asChild className="btn-electric">
              <Link to="/quote-request">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-left text-foreground hover:text-accent transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('products')} 
                className="text-left text-foreground hover:text-accent transition-colors"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-left text-foreground hover:text-accent transition-colors"
              >
                About Us
              </button>
              <Link to="/contact" className="text-foreground hover:text-accent transition-colors">
                Contact
              </Link>
              <Button 
                variant="outline" 
                onClick={toggleSearch}
                className="w-full mt-4 border-border hover:border-accent"
              >
                <Search className="mr-2 h-4 w-4" />
                Search Products
              </Button>
              <Button 
                variant="outline" 
                onClick={toggleTheme}
                className="w-full mt-2 border-border hover:border-accent"
              >
                {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
              </Button>
              <Button asChild className="btn-electric w-full mt-2">
                <Link to="/quote-request">Get Quote</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
      
      {/* Product Search Modal */}
      <ProductSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;