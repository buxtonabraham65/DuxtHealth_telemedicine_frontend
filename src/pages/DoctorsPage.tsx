import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin } from "lucide-react";
import { useState } from "react";
import { doctors } from "@/data/doctors";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import StarRating from "@/components/StarRating";
import DuxtCoinPrice from "@/components/DuxtCoinPrice";

const specialties = ["All", "General", "Pediatrician", "Cardiologist", "Dermatologist", "Internal Medicine", "Orthopedic"];

const DoctorsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = doctors.filter((doc) => {
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || doc.specialty.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || doc.specialty.toLowerCase().includes(activeFilter.toLowerCase());
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Doctors Available" subtitle="Find & book your doctor" balance="1,250 DXT" />

      {/* Search */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 bg-card rounded-xl border border-border px-3 py-2.5 shadow-card">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search doctors, specialties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
          <Filter className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-4 mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setActiveFilter(spec)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeFilter === spec
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctor Cards */}
      <div className="px-4 mt-4 space-y-3">
        {filtered.map((doctor, i) => (
          <button
            key={doctor.id}
            onClick={() => navigate(`/doctor/${doctor.id}`)}
            className="w-full bg-card rounded-2xl shadow-card border border-border p-4 flex gap-4 text-left hover:shadow-card-hover transition-shadow animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                  doctor.available ? "bg-success" : "bg-muted-foreground"
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-foreground truncate">{doctor.name}</h3>
              <p className="text-xs text-secondary font-medium">{doctor.specialty}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">{doctor.country}</span>
              </div>
              <StarRating rating={doctor.rating} size={12} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-foreground">${doctor.priceDollars}</span>
                <DuxtCoinPrice amount={doctor.priceDuxtcoins} size="sm" />
              </div>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default DoctorsPage;
