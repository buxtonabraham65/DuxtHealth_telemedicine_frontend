import { useState } from "react";
import { Home, Clock, MapPin, Calendar, User, Phone, FileText, CheckCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import DuxtCoinPrice from "@/components/DuxtCoinPrice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const services = [
  { id: "nursing", name: "Home Nursing", price: 80, duxt: 340, desc: "Professional nurse visits for wound care, injections, IV therapy" },
  { id: "physio", name: "Physiotherapy", price: 65, duxt: 280, desc: "Physical rehabilitation and exercise therapy at home" },
  { id: "elderly", name: "Elderly Care", price: 100, duxt: 430, desc: "Comprehensive care for senior family members" },
  { id: "postop", name: "Post-Surgery Care", price: 120, duxt: 515, desc: "Recovery assistance after surgical procedures" },
  { id: "lab", name: "Lab Sample Collection", price: 25, duxt: 107, desc: "Blood tests and sample collection at your doorstep" },
  { id: "checkup", name: "General Checkup", price: 45, duxt: 193, desc: "Routine health examination at home" },
];

const HomecarePage = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const service = services.find((s) => s.id === selectedService);

  const handleBook = () => {
    if (!selectedService || !name || !phone || !address || !date) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Homecare service booked successfully! A caregiver will contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="Homecare" subtitle="DUXT. HOMECARE" balance="1,250 DXT" />

      {/* Intro */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-primary rounded-2xl p-5">
          <Home className="w-10 h-10 text-primary-foreground mb-2" />
          <h2 className="text-base font-heading font-bold text-primary-foreground">Quality Healthcare at Your Doorstep</h2>
          <p className="text-xs text-primary-foreground/70 mt-1">Book professional healthcare services to be delivered right to your home.</p>
        </div>
      </div>

      {/* Services */}
      <div className="px-4 mt-5">
        <h3 className="text-sm font-heading font-bold text-foreground mb-3">Select a Service</h3>
        <div className="space-y-2">
          {services.map((svc) => (
            <button
              key={svc.id}
              onClick={() => setSelectedService(svc.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedService === svc.id
                  ? "border-secondary bg-secondary/5 shadow-card"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">{svc.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{svc.desc}</p>
                </div>
                {selectedService === svc.id && <CheckCircle className="w-5 h-5 text-secondary shrink-0" />}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm font-bold text-foreground">${svc.price}</span>
                <DuxtCoinPrice amount={svc.duxt} size="sm" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      {selectedService && (
        <div className="px-4 mt-5 animate-fade-in">
          <h3 className="text-sm font-heading font-bold text-foreground mb-3">Booking Details</h3>
          <div className="bg-card rounded-xl border border-border p-4 space-y-3">
            <div>
              <label className="text-xs font-medium text-foreground flex items-center gap-1"><User className="w-3 h-3" /> Full Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> Phone Number *</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="024 XXX XXXX" className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> Home Address *</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Your home address" className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> Date *</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary" />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Time</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground flex items-center gap-1"><FileText className="w-3 h-3" /> Additional Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requirements..." rows={3} className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground resize-none" />
            </div>
          </div>
        </div>
      )}

      {/* Book Button */}
      {selectedService && (
        <div className="fixed bottom-16 left-0 right-0 px-4 py-3 bg-background/80 backdrop-blur-sm border-t border-border">
          <Button onClick={handleBook} className="w-full bg-gradient-primary text-primary-foreground font-bold rounded-xl h-12 text-sm">
            Book {service?.name} — ${service?.price}
          </Button>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default HomecarePage;
