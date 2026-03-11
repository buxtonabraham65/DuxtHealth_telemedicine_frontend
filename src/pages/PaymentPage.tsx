import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreditCard, Smartphone, Building, Wallet, Check } from "lucide-react";
import { doctors } from "@/data/doctors";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import DuxtCoinPrice from "@/components/DuxtCoinPrice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type PaymentMethod = "momo" | "card" | "bank" | "paypal" | "duxtcoin";

const paymentMethods: { id: PaymentMethod; label: string; icon: typeof CreditCard; description: string }[] = [
  { id: "momo", label: "Mobile Money", icon: Smartphone, description: "MTN MoMo, Vodafone Cash, AirtelTigo" },
  { id: "card", label: "Debit/Credit Card", icon: CreditCard, description: "Visa, Mastercard, Verve" },
  { id: "bank", label: "Bank Transfer", icon: Building, description: "Direct bank transfer" },
  { id: "paypal", label: "PayPal", icon: Wallet, description: "Pay with PayPal account" },
  { id: "duxtcoin", label: "DuxtCoins", icon: Wallet, description: "Pay with your DuxtCoin balance" },
];

const PaymentPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((d) => d.id === doctorId);
  const [selected, setSelected] = useState<PaymentMethod | null>(null);
  const [momoNumber, setMomoNumber] = useState("");
  const [momoProvider, setMomoProvider] = useState("mtn");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Doctor not found</p>
      </div>
    );
  }

  const handlePayment = () => {
    if (!selected) {
      toast.error("Please select a payment method");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      toast.success("Payment successful! Your appointment is booked.");
      navigate(`/call/${doctor.id}?type=video`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="Payment" subtitle={`Booking: ${doctor.name}`} balance="1,250 DXT" />

      {/* Order Summary */}
      <div className="px-4 pt-4">
        <div className="bg-card rounded-xl border border-border p-4 shadow-card">
          <div className="flex items-center gap-3">
            <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-xl object-cover" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-foreground">{doctor.name}</h3>
              <p className="text-xs text-secondary">{doctor.specialty}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Consultation Fee</span>
            <div className="text-right">
              <p className="text-base font-bold text-foreground">${doctor.priceDollars}</p>
              <DuxtCoinPrice amount={doctor.priceDuxtcoins} size="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="px-4 mt-5">
        <h3 className="text-sm font-heading font-bold text-foreground mb-3">Payment Method</h3>
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelected(method.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                selected === method.id
                  ? "border-secondary bg-secondary/5 shadow-card"
                  : "border-border bg-card hover:border-secondary/30"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                selected === method.id ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                <method.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{method.label}</p>
                <p className="text-[11px] text-muted-foreground">{method.description}</p>
              </div>
              {selected === method.id && (
                <Check className="w-5 h-5 text-secondary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Details */}
      {selected && (
        <div className="px-4 mt-5 animate-fade-in">
          <h3 className="text-sm font-heading font-bold text-foreground mb-3">Payment Details</h3>
          <div className="bg-card rounded-xl border border-border p-4 space-y-3">
            {selected === "momo" && (
              <>
                <div>
                  <label className="text-xs font-medium text-foreground">Provider</label>
                  <select
                    value={momoProvider}
                    onChange={(e) => setMomoProvider(e.target.value)}
                    className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary"
                  >
                    <option value="mtn">MTN Mobile Money</option>
                    <option value="vodafone">Vodafone Cash</option>
                    <option value="airtel">AirtelTigo Money</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="024 XXX XXXX"
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground"
                  />
                </div>
              </>
            )}
            {selected === "card" && (
              <>
                <div>
                  <label className="text-xs font-medium text-foreground">Cardholder Name</label>
                  <input type="text" placeholder="Full name on card" value={cardName} onChange={(e) => setCardName(e.target.value)} className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Card Number</label>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-foreground">Expiry</label>
                    <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground">CVV</label>
                    <input type="text" placeholder="123" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground" />
                  </div>
                </div>
              </>
            )}
            {selected === "bank" && (
              <>
                <div>
                  <label className="text-xs font-medium text-foreground">Bank Name</label>
                  <select value={bankName} onChange={(e) => setBankName(e.target.value)} className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary">
                    <option value="">Select your bank</option>
                    <option value="gcb">GCB Bank</option>
                    <option value="ecobank">Ecobank</option>
                    <option value="stanbic">Stanbic Bank</option>
                    <option value="absa">Absa Bank</option>
                    <option value="fidelity">Fidelity Bank</option>
                    <option value="uba">UBA</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Account Number</label>
                  <input type="text" placeholder="Enter account number" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground" />
                </div>
              </>
            )}
            {selected === "paypal" && (
              <div>
                <label className="text-xs font-medium text-foreground">PayPal Email</label>
                <input type="email" placeholder="your@email.com" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground" />
              </div>
            )}
            {selected === "duxtcoin" && (
              <div className="text-center py-2">
                <DuxtCoinPrice amount={doctor.priceDuxtcoins} size="lg" />
                <p className="text-xs text-muted-foreground mt-2">Will be deducted from your DuxtCoin balance</p>
                <p className="text-xs text-success font-medium mt-1">Current balance: 1,250 DXT</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pay Button */}
      <div className="fixed bottom-16 left-0 right-0 px-4 py-3 bg-background/80 backdrop-blur-sm border-t border-border">
        <Button
          onClick={handlePayment}
          disabled={!selected || processing}
          className="w-full bg-gradient-primary text-primary-foreground font-bold rounded-xl h-12 text-sm"
        >
          {processing ? "Processing..." : selected === "duxtcoin" ? `Pay ${doctor.priceDuxtcoins} DXT` : `Pay $${doctor.priceDollars}`}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default PaymentPage;
