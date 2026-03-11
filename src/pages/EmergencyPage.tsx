import { useState } from "react";
import { MapPin, Phone, AlertTriangle, Share2, Navigation } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const emergencyContacts = [
  { name: "DuxtHealth Emergency Line", number: "+233 800 DUXT 911", type: "primary" },
  { name: "National Ambulance Service", number: "193", type: "ambulance" },
  { name: "Fire Service", number: "192", type: "fire" },
  { name: "Police Emergency", number: "191", type: "police" },
  { name: "Poison Control", number: "+233 302 665 401", type: "poison" },
];

const EmergencyPage = () => {
  const [sharing, setSharing] = useState(false);

  const handleShareLocation = () => {
    setSharing(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast.success(`Location shared: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
          setSharing(false);
        },
        () => {
          toast.error("Unable to get location. Please enable location services.");
          setSharing(false);
        }
      );
    } else {
      toast.error("Geolocation not supported");
      setSharing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Emergency" subtitle="Get help fast" />

      {/* Hero */}
      <div className="px-4 pt-4">
        <div className="bg-destructive rounded-2xl p-5 text-center">
          <AlertTriangle className="w-12 h-12 text-destructive-foreground mx-auto mb-2" />
          <h2 className="text-lg font-heading font-bold text-destructive-foreground">DUXTHELATH EMERGENCY CONTACT</h2>
          <p className="text-xs text-destructive-foreground/80 mt-1">Show us where you are and help will show up...</p>
        </div>
      </div>

      {/* Share Location */}
      <div className="px-4 mt-5 text-center">
        <p className="text-sm font-bold text-accent mb-3">PRESS THIS BUTTON TO SHARE LOCATION</p>
        <div className="flex flex-col items-center gap-3">
          <Navigation className="w-16 h-16 text-secondary animate-pulse-soft" />
          <Button
            onClick={handleShareLocation}
            disabled={sharing}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold rounded-full px-8 h-14 text-base"
          >
            <Share2 className="w-5 h-5 mr-2" />
            {sharing ? "Sharing..." : "HELP BUTTON"}
          </Button>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-heading font-bold text-foreground mb-3">Emergency Contacts</h3>
        <div className="space-y-2">
          {emergencyContacts.map((contact) => (
            <a
              key={contact.name}
              href={`tel:${contact.number.replace(/\s/g, "")}`}
              className="flex items-center gap-3 bg-card rounded-xl border border-border p-4 hover:shadow-card transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{contact.name}</p>
                <p className="text-xs text-muted-foreground">{contact.number}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Nearby Hospitals */}
      <div className="px-4 mt-5">
        <h3 className="text-sm font-heading font-bold text-foreground mb-3">Nearby Hospitals</h3>
        {["Korle Bu Teaching Hospital — 2.3 km", "37 Military Hospital — 4.1 km", "Ridge Hospital — 5.7 km"].map((h) => (
          <div key={h} className="flex items-center gap-3 bg-card rounded-xl border border-border p-3 mb-2">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-xs text-foreground">{h}</span>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default EmergencyPage;
