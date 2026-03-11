import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Heart, Phone } from "lucide-react";

import heroDoctors from "@/assets/hero-doctors.jpg";
import speakDoctor from "@/assets/speak-doctor.jpg";
import emergency from "@/assets/emergency.jpg";
import pharmacy from "@/assets/pharmacy.jpg";
import homecare from "@/assets/homecare.jpg";
import firstAid from "@/assets/first-aid.jpg";
import logo from "@/assets/logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] mt-16 overflow-hidden">
        <img src={heroDoctors} alt="Healthcare professionals" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/30 to-foreground/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="brand-title text-4xl sm:text-5xl md:text-6xl font-bold mb-4 !text-primary-foreground drop-shadow-lg">
            DUXTHEALTH
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mb-8 font-body text-primary-foreground/90">
            Your trusted digital healthcare platform. Access quality medical services anytime, anywhere.
          </p>
          <div className="flex gap-4">
            <Link to="/signup" className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-all duration-300 flex items-center gap-2">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="px-8 py-3 bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground font-semibold rounded-lg border border-primary-foreground/30 hover:bg-primary-foreground/30 transition-all duration-300">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="relative -mt-16 z-10 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Shield, label: "Trusted Care", value: "10K+ Patients" },
            { icon: Clock, label: "24/7 Access", value: "Always Available" },
            { icon: Heart, label: "Expert Doctors", value: "500+ Specialists" },
            { icon: Phone, label: "Telemedicine", value: "Virtual Visits" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-5 text-center border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
              <stat.icon className="mx-auto mb-2 text-primary" size={28} />
              <p className="font-display font-semibold text-foreground text-sm">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Healthcare Professionals Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">Our Services</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Comprehensive healthcare solutions designed for your well-being</p>
        </div>

        {/* Large Cards */}
        <div className="space-y-6">
          <ServiceCard image={heroDoctors} title="Healthcare Professionals Dashboard" size="large" to="doctordashboard" />
          <ServiceCard image={speakDoctor} title="Speak with a Doctor" size="large" to="/PatientDashboard" />

          {/* Grid of smaller cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <ServiceCard image={emergency} title="Emergency" size="medium" to="/emergency" />
            <ServiceCard image={pharmacy} title="Pharmacy" size="medium" to="/pharmacy" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <ServiceCard image={homecare} title="HomeCare" size="medium" />
            <ServiceCard image={firstAid} title="First Aid Education & Health Tips" size="medium" />
            <div className="service-card h-64 bg-gradient-to-br from-primary to-healthcare-light-blue flex items-center justify-center rounded-xl cursor-pointer">
              <div className="text-center p-6">
                <img src={logo} alt="DuxtCoin" className="h-16 w-16 mx-auto mb-4 brightness-200" />
                <h3 className="font-display text-xl font-bold text-primary-foreground">DuxtCoin</h3>
                <p className="text-sm text-primary-foreground/80 mt-1">Mine or get DuxtCoin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
