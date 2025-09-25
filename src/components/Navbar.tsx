import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, MapPin } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">RushResQ</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="nav-link">
              Home
            </button>
            <button onClick={() => scrollToSection('request-form')} className="nav-link">
              Request Corridor
            </button>
            <button onClick={() => scrollToSection('dashboard')} className="nav-link">
              Dashboard
            </button>
            <button onClick={() => scrollToSection('about')} className="nav-link">
              About Us
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
              Contact
            </button>
          </div>

          {/* Emergency Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => scrollToSection('request-form')}
              className="btn-emergency hidden sm:flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Emergency</span>
            </Button>
            
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <button onClick={() => scrollToSection('home')} className="nav-link text-left">
                Home
              </button>
              <button onClick={() => scrollToSection('request-form')} className="nav-link text-left">
                Request Corridor
              </button>
              <button onClick={() => scrollToSection('dashboard')} className="nav-link text-left">
                Dashboard
              </button>
              <button onClick={() => scrollToSection('about')} className="nav-link text-left">
                About Us
              </button>
              <button onClick={() => scrollToSection('contact')} className="nav-link text-left">
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection('request-form')}
                className="btn-emergency w-full mt-4 flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Emergency</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;