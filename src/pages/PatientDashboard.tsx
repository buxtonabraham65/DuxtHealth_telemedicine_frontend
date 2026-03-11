import { useNavigate } from "react-router-dom";
import {
  Phone,
  ShoppingBag,
  AlertTriangle,
  Home as HomeIcon,
  Stethoscope,
  Video,
  MapPin,
  Coins,
  Shield
} from "lucide-react";

import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import duxtcoinImg from "@/assets/duxtcoin.png";

const services = [
  {
    icon: Stethoscope,
    label: "Speak with Doctor",
    path: "/doctors",
    color: "bg-secondary text-secondary-foreground"
  },
  {
    icon: ShoppingBag,
    label: "Pharmacy",
    path: "/pharmacy",
    color: "bg-success text-success-foreground"
  },
  {
    icon: AlertTriangle,
    label: "Emergency",
    path: "/emergency",
    color: "bg-accent text-accent-foreground"
  },
  {
    icon: HomeIcon,
    label: "Homecare",
    path: "/homecare",
    color: "bg-primary text-primary-foreground"
  },
  {
    icon: Video,
    label: "Video Call",
    path: "/doctors",
    color: "bg-gold text-gold-foreground"
  },
  {
    icon: MapPin,
    label: "Find Hospital",
    path: "/emergency",
    color: "bg-destructive text-destructive-foreground"
  },

  // NEW SERVICES
  {
    icon: Coins,
    label: "DuxtCoin",
    path: "/duxtcoin",
    color: "bg-yellow-500 text-white"
  },
  {
    icon: Shield,
    label: "Medical Wallet",
    path: "/medical-wallet",
    color: "bg-purple-500 text-white"
  }
];

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">

      <Navbar />

      {/* Header */}
      <div className="bg-gradient-primary px-5 pt-12 pb-10 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">

          <div>
            <p className="text-sm opacity-80 text-primary-foreground">
              Welcome back,
            </p>
            <h1 className="text-xl font-heading font-bold text-primary-foreground">
              Guest User
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-primary-foreground/15 rounded-full px-3 py-1.5">
            <img src={duxtcoinImg} alt="DuxtCoin" width={20} height={20} />
            <span className="text-sm font-bold text-primary-foreground">
              1,250 DXT
            </span>
          </div>

        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Consultations", value: "12" },
            { label: "Prescriptions", value: "5" },
            { label: "Next Appt", value: "Mar 10" }
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-primary-foreground/10 rounded-xl px-3 py-3 text-center"
            >
              <p className="text-lg font-bold text-primary-foreground">
                {stat.value}
              </p>
              <p className="text-[10px] text-primary-foreground/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-5 -mt-5">
        <div className="bg-card rounded-2xl shadow-card p-4">

          <h2 className="text-sm font-heading font-bold text-foreground mb-3">
            Our Services
          </h2>

          <div className="grid grid-cols-3 gap-3">

            {services.map((service) => (
              <button
                key={service.label}
                onClick={() => navigate(service.path)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.color}`}
                >
                  <service.icon className="w-6 h-6" />
                </div>

                <span className="text-[11px] font-medium text-foreground text-center leading-tight">
                  {service.label}
                </span>

              </button>
            ))}

          </div>
        </div>
      </div>

      {/* Health Tips */}
      <div className="px-5 mt-5">

        <h2 className="text-sm font-heading font-bold text-foreground mb-3">
          Health Tips
        </h2>

        <div className="space-y-3">

          {[
            {
              title: "Stay Hydrated",
              desc: "Drink at least 8 glasses of water daily for optimal health."
            },
            {
              title: "Regular Check-ups",
              desc: "Schedule regular health screenings to catch issues early."
            }
          ].map((tip) => (

            <div
              key={tip.title}
              className="bg-card rounded-xl shadow-card p-4 border border-border"
            >

              <h3 className="text-sm font-bold text-foreground">
                {tip.title}
              </h3>

              <p className="text-xs text-muted-foreground mt-1">
                {tip.desc}
              </p>

            </div>

          ))}

        </div>
      </div>

      {/* Emergency CTA */}
      <div className="px-5 mt-5">

        <div className="bg-gradient-accent rounded-2xl p-5 text-center">

          <h3 className="text-base font-heading font-bold text-accent-foreground">
            Need Urgent Help?
          </h3>

          <p className="text-xs text-accent-foreground/80 mt-1 mb-3">
            Connect with a doctor instantly
          </p>

          <Button
            onClick={() => navigate("/emergency")}
            className="bg-card text-accent hover:bg-card/90 font-bold rounded-full px-6"
          >
            Emergency Contact
          </Button>

        </div>

      </div>

      <BottomNav />

      <Footer />

    </div>
  );
};

export default PatientDashboard;