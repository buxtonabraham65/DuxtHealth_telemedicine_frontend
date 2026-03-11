import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="DuxtHealth" className="h-10 w-10 object-contain" />
            <span className="brand-title text-xl font-bold hidden sm:block">DUXTHEALTH</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/signup" className="px-5 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Sign Up
            </Link>
            <Link to="/login" className="px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all duration-300">
              Login
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border space-y-3">
            <Link to="/" className="block text-foreground font-medium py-2" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/services" className="block text-muted-foreground py-2" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/about" className="block text-muted-foreground py-2" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" className="block text-muted-foreground py-2" onClick={() => setIsOpen(false)}>Contact</Link>
            <div className="flex gap-3 pt-2">
              <Link to="/signup" className="flex-1 text-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg" onClick={() => setIsOpen(false)}>Sign Up</Link>
              <Link to="/login" className="flex-1 text-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg" onClick={() => setIsOpen(false)}>Login</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
