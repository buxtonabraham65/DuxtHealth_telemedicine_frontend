import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, Globe, GraduationCap, Building2, Phone, Video, MessageSquare } from "lucide-react";
import { doctors } from "@/data/doctors";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import StarRating from "@/components/StarRating";
import DuxtCoinPrice from "@/components/DuxtCoinPrice";
import { Button } from "@/components/ui/button";

const DoctorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Doctor not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="Doctor Profile" />

      {/* Hero */}
      <div className="bg-gradient-primary px-5 pt-4 pb-16 flex flex-col items-center text-center">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-28 h-28 rounded-2xl object-cover border-4 border-primary-foreground/20 shadow-lg"
        />
        <h2 className="text-lg font-heading font-bold text-primary-foreground mt-3">{doctor.name}</h2>
        <p className="text-sm text-primary-foreground/80">{doctor.specialty}</p>
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3 text-primary-foreground/60" />
          <span className="text-xs text-primary-foreground/70">{doctor.country}</span>
        </div>
        <div className="mt-2">
          <StarRating rating={doctor.rating} size={16} />
        </div>
        <p className="text-xs text-primary-foreground/60 mt-0.5">{doctor.reviews} reviews</p>
      </div>

      {/* Stats */}
      <div className="px-5 -mt-10">
        <div className="bg-card rounded-2xl shadow-card p-4 grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-lg font-bold text-secondary">{doctor.experience}</p>
            <p className="text-[10px] text-muted-foreground">Years Exp.</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-lg font-bold text-secondary">{doctor.reviews}</p>
            <p className="text-[10px] text-muted-foreground">Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-secondary">{doctor.rating}</p>
            <p className="text-[10px] text-muted-foreground">Rating</p>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="px-5 mt-5">
        <h3 className="text-sm font-heading font-bold text-foreground mb-2">About</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{doctor.bio}</p>
      </div>

      {/* Details */}
      <div className="px-5 mt-5 space-y-3">
        <div className="flex items-start gap-3">
          <Globe className="w-4 h-4 text-secondary mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-foreground">Languages</p>
            <p className="text-xs text-muted-foreground">{doctor.languages.join(", ")}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <GraduationCap className="w-4 h-4 text-secondary mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-foreground">Qualifications</p>
            {doctor.qualifications.map((q) => (
              <p key={q} className="text-xs text-muted-foreground">• {q}</p>
            ))}
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Building2 className="w-4 h-4 text-secondary mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-foreground">Hospital</p>
            <p className="text-xs text-muted-foreground">{doctor.hospitalAffiliation}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="w-4 h-4 text-secondary mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-foreground">Availability</p>
            <p className={`text-xs font-semibold ${doctor.available ? "text-success" : "text-destructive"}`}>
              {doctor.available ? "Available Now" : "Currently Unavailable"}
            </p>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="px-5 mt-5">
        <h3 className="text-sm font-heading font-bold text-foreground mb-2">Consultation Fee</h3>
        <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-foreground">${doctor.priceDollars}</p>
            <p className="text-xs text-muted-foreground">per session</p>
          </div>
          <div className="text-right">
            <DuxtCoinPrice amount={doctor.priceDuxtcoins} size="lg" />
            <p className="text-xs text-muted-foreground">or DuxtCoins</p>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="px-5 mt-5 grid grid-cols-3 gap-3">
        <button
          onClick={() => navigate(`/call/${doctor.id}?type=voice`)}
          className="flex flex-col items-center gap-1.5 bg-card rounded-xl border border-border p-3 hover:shadow-card transition-shadow"
        >
          <Phone className="w-5 h-5 text-secondary" />
          <span className="text-[10px] font-medium text-foreground">Voice Call</span>
        </button>
        <button
          onClick={() => navigate(`/call/${doctor.id}?type=video`)}
          className="flex flex-col items-center gap-1.5 bg-card rounded-xl border border-border p-3 hover:shadow-card transition-shadow"
        >
          <Video className="w-5 h-5 text-success" />
          <span className="text-[10px] font-medium text-foreground">Video Call</span>
        </button>
        <button
          onClick={() => navigate(`/call/${doctor.id}?type=chat`)}
          className="flex flex-col items-center gap-1.5 bg-card rounded-xl border border-border p-3 hover:shadow-card transition-shadow"
        >
          <MessageSquare className="w-5 h-5 text-accent" />
          <span className="text-[10px] font-medium text-foreground">Chat</span>
        </button>
      </div>

      {/* Book Button */}
      <div className="fixed bottom-16 left-0 right-0 px-5 py-3 bg-background/80 backdrop-blur-sm border-t border-border">
        <Button
          onClick={() => navigate(`/payment/${doctor.id}`)}
          className="w-full bg-gradient-primary text-primary-foreground font-bold rounded-xl h-12 text-sm"
          disabled={!doctor.available}
        >
          {doctor.available ? `Book Now — $${doctor.priceDollars}` : "Currently Unavailable"}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default DoctorProfilePage;
