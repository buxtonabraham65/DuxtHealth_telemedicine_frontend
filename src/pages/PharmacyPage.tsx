import { useState } from "react";
import { Search, ShoppingCart, Plus, Minus, X, Pill } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import DuxtCoinPrice from "@/components/DuxtCoinPrice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import pharmacyBanner from "@/assets/pharmacy-banner.jpg";

interface Drug {
  id: string;
  name: string;
  category: string;
  priceDollars: number;
  priceDuxtcoins: number;
  prescription: boolean;
}

const drugs: Drug[] = [
  { id: "1", name: "Paracetamol 500mg", category: "Pain Relief", priceDollars: 3, priceDuxtcoins: 13, prescription: false },
  { id: "2", name: "Amoxicillin 250mg", category: "Antibiotics", priceDollars: 8, priceDuxtcoins: 34, prescription: true },
  { id: "3", name: "Ibuprofen 400mg", category: "Pain Relief", priceDollars: 5, priceDuxtcoins: 21, prescription: false },
  { id: "4", name: "Metformin 500mg", category: "Diabetes", priceDollars: 12, priceDuxtcoins: 51, prescription: true },
  { id: "5", name: "Lisinopril 10mg", category: "Hypertension", priceDollars: 10, priceDuxtcoins: 43, prescription: true },
  { id: "6", name: "Vitamin C 1000mg", category: "Supplements", priceDollars: 6, priceDuxtcoins: 26, prescription: false },
  { id: "7", name: "Omeprazole 20mg", category: "Digestive", priceDollars: 7, priceDuxtcoins: 30, prescription: false },
  { id: "8", name: "Cetirizine 10mg", category: "Allergy", priceDollars: 4, priceDuxtcoins: 17, prescription: false },
];

const PharmacyPage = () => {
  const [search, setSearch] = useState("");
  const [prescriptionCode, setPrescriptionCode] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [drugName, setDrugName] = useState("");

  const addToCart = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id: string) => {
    setCart((c) => {
      const newCart = { ...c };
      if (newCart[id] > 1) newCart[id]--;
      else delete newCart[id];
      return newCart;
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const drug = drugs.find((d) => d.id === id);
    return sum + (drug ? drug.priceDollars * qty : 0);
  }, 0);

  const filtered = drugs.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="Pharmacy" subtitle="Order medications online" balance="1,250 DXT" />

      {/* Banner */}
      <div className="px-4 pt-4">
        <img src={pharmacyBanner} alt="Pharmacy" className="w-full h-36 object-cover rounded-2xl" />
      </div>

      {/* Prescription Code */}
      <div className="px-4 mt-4">
        <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
          <label className="text-xs font-semibold text-secondary">Enter prescription code</label>
          <input
            type="text"
            placeholder="e.g. RX-2024-XXXXX"
            value={prescriptionCode}
            onChange={(e) => setPrescriptionCode(e.target.value)}
            className="w-full mt-1 bg-card text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Or search */}
      <div className="px-4 mt-3 text-center">
        <span className="text-xs text-muted-foreground">— OR —</span>
      </div>

      {/* Drug Name */}
      <div className="px-4 mt-2">
        <label className="text-xs font-semibold text-foreground">Enter the name of the drugs</label>
        <input
          type="text"
          placeholder="Type drug name..."
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
          className="w-full mt-1 bg-card text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground"
        />
      </div>

      {/* Search */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 bg-card rounded-xl border border-border px-3 py-2.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search medications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Drug List */}
      <div className="px-4 mt-4 space-y-2">
        {filtered.map((drug) => (
          <div key={drug.id} className="bg-card rounded-xl border border-border p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Pill className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-sm font-semibold text-foreground truncate">{drug.name}</p>
                {drug.prescription && (
                  <span className="text-[9px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full font-medium">Rx</span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground">{drug.category}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-bold text-foreground">${drug.priceDollars}</span>
                <DuxtCoinPrice amount={drug.priceDuxtcoins} size="sm" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {cart[drug.id] ? (
                <>
                  <button onClick={() => removeFromCart(drug.id)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                    <Minus className="w-3 h-3 text-foreground" />
                  </button>
                  <span className="text-sm font-bold text-foreground w-5 text-center">{cart[drug.id]}</span>
                  <button onClick={() => addToCart(drug.id)} className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                    <Plus className="w-3 h-3 text-secondary-foreground" />
                  </button>
                </>
              ) : (
                <button onClick={() => addToCart(drug.id)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Plus className="w-4 h-4 text-secondary-foreground" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Footer */}
      {totalItems > 0 && (
        <div className="fixed bottom-16 left-0 right-0 px-4 py-3 bg-background/80 backdrop-blur-sm border-t border-border">
          <Button
            onClick={() => toast.success("Order placed successfully!")}
            className="w-full bg-gradient-primary text-primary-foreground font-bold rounded-xl h-12 text-sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Purchase ({totalItems} items) — ${totalPrice}
          </Button>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default PharmacyPage;
