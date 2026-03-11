import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="DuxtHealth" className="h-8 w-8 object-contain invert" />
              <span className="font-display text-lg font-bold">DUXTHEALTH</span>
            </div>
            <p className="text-sm opacity-70">Your trusted healthcare partner. Access quality medical services anytime, anywhere.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/" className="hover:opacity-100 transition-opacity">Speak with a Doctor</Link></li>
              <li><Link to="/" className="hover:opacity-100 transition-opacity">Emergency</Link></li>
              <li><Link to="/" className="hover:opacity-100 transition-opacity">Pharmacy</Link></li>
              <li><Link to="/" className="hover:opacity-100 transition-opacity">HomeCare</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/" className="hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/" className="hover:opacity-100 transition-opacity">Company Details</Link></li>
              <li><Link to="/" className="hover:opacity-100 transition-opacity">Guides</Link></li>
              <li><Link to="/" className="hover:opacity-100 transition-opacity">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/" className="hover:opacity-100 transition-opacity">Terms of Use</Link></li>
              <li><Link to="/" className="hover:opacity-100 transition-opacity">Terms of Sale</Link></li>
              <li><Link to="/" className="hover:opacity-100 transition-opacity">Privacy & Cookie Policy</Link></li>
              <li><Link to="/" className="hover:opacity-100 transition-opacity">Privacy & Cookie Setting</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-60">
          &copy; {new Date().getFullYear()} DuxtHealth, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
