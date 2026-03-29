import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Globe,
  GraduationCap,
  Building2,
  Phone,
  Video,
  MessageSquare,
} from "lucide-react";
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
    <div className="min-h-screen bg-background pb-44">
      <PageHeader title="Doctor Profile" />

      {/* HERO */}
      <div className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary px-5 pt-6 pb-20 flex flex-col items-center text-center overflow-hidden">
        
        {/* subtle glow */}
        <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-[-50px] right-[-50px]" />

        <div className="relative">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-28 h-28 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
          />

          {/* ONLINE DOT */}
          {doctor.available && (
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
          )}
        </div>

        <h2 className="text-xl font-bold text-white mt-4">
          {doctor.name}
        </h2>

        <p className="text-sm text-white/80">{doctor.specialty}</p>

        <div className="flex items-center gap-1 mt-2">
          <MapPin className="w-3 h-3 text-white/70" />
          <span className="text-xs text-white/80">
            {doctor.country}
          </span>
        </div>

        <div className="mt-3">
          <StarRating rating={doctor.rating} size={18} />
        </div>

        <p className="text-xs text-white/70 mt-1">
          {doctor.reviews} reviews
        </p>
      </div>

      {/* STATS */}
      <div className="px-5 -mt-12">
        <div className="bg-card/80 backdrop-blur-md rounded-2xl shadow-xl p-4 grid grid-cols-3 gap-3 border border-border">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">
              {doctor.experience}
            </p>
            <p className="text-[10px] text-muted-foreground">
              Years Exp.
            </p>
          </div>

          <div className="text-center border-x border-border">
            <p className="text-lg font-bold text-primary">
              {doctor.reviews}
            </p>
            <p className="text-[10px] text-muted-foreground">
              Reviews
            </p>
          </div>

          <div className="text-center">
            <p className="text-lg font-bold text-primary">
              {doctor.rating}
            </p>
            <p className="text-[10px] text-muted-foreground">
              Rating
            </p>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="px-5 mt-6">
        <div className="bg-card rounded-2xl p-4 shadow-md border border-border">
          <h3 className="text-sm font-bold mb-2">About</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {doctor.bio}
          </p>
        </div>
      </div>

      {/* DETAILS */}
      <div className="px-5 mt-5 space-y-3">
        {[
          {
            icon: Globe,
            title: "Languages",
            value: doctor.languages.join(", "),
          },
          {
            icon: GraduationCap,
            title: "Qualifications",
            value: doctor.qualifications.join(", "),
          },
          {
            icon: Building2,
            title: "Hospital",
            value: doctor.hospitalAffiliation,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 bg-card p-3 rounded-xl border border-border shadow-sm hover:shadow-md transition"
          >
            <item.icon className="w-4 h-4 text-primary mt-1" />
            <div>
              <p className="text-xs font-semibold">{item.title}</p>
              <p className="text-xs text-muted-foreground">
                {item.value}
              </p>
            </div>
          </div>
        ))}

        {/* Availability */}
        <div className="flex items-start gap-3 bg-card p-3 rounded-xl border border-border shadow-sm">
          <Clock className="w-4 h-4 text-primary mt-1" />
          <div>
            <p className="text-xs font-semibold">Availability</p>
            <p
              className={`text-xs font-bold ${
                doctor.available
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {doctor.available
                ? "Available Now"
                : "Currently Unavailable"}
            </p>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div className="px-5 mt-6">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 border border-border shadow-sm flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">
              ${doctor.priceDollars}
            </p>
            <p className="text-xs text-muted-foreground">
              per session
            </p>
          </div>

          <div className="text-right">
            <DuxtCoinPrice
              amount={doctor.priceDuxtcoins}
              size="lg"
            />
            <p className="text-xs text-muted-foreground">
              or DuxtCoins
            </p>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="px-5 mt-6">
        <div className="bg-card rounded-2xl border border-border p-4 shadow-lg">
          <h3 className="text-sm font-bold mb-3">
            Contact Options
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: Phone,
                label: "Voice",
                color: "text-blue-500",
                route: "voice",
              },
              {
                icon: Video,
                label: "Video",
                color: "text-green-500",
                route: "video",
              },
              {
                icon: MessageSquare,
                label: "Chat",
                color: "text-purple-500",
                route: "chat",
              },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() =>
                  navigate(`/call/${doctor.id}?type=${item.route}`)
                }
                className="group flex flex-col items-center justify-center gap-2 bg-muted/30 rounded-xl p-4 hover:bg-primary/10 hover:shadow-md transition-all active:scale-95"
              >
                <item.icon
                  className={`w-6 h-6 ${item.color} group-hover:scale-110 transition`}
                />
                <span className="text-xs font-medium">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BOOK BUTTON */}
      <div className="fixed bottom-16 left-0 right-0 px-5 py-3 bg-background/90 backdrop-blur-lg border-t border-border z-50">
        <Button
          onClick={() => navigate(`/payment/${doctor.id}`)}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl h-12 text-sm shadow-lg hover:opacity-90 transition"
          disabled={!doctor.available}
        >
          {doctor.available
            ? `Book Now — $${doctor.priceDollars}`
            : "Currently Unavailable"}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default DoctorProfilePage;
