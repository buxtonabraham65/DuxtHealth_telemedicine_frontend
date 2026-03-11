import { User, Settings, CreditCard, Bell, LogOut, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import duxtcoinImg from "@/assets/duxtcoin.png";

const menuItems = [
  { icon: User, label: "Personal Information", path: "#" },
  { icon: CreditCard, label: "Payment Methods", path: "#" },
  { icon: Bell, label: "Notifications", path: "#" },
  { icon: Settings, label: "Settings", path: "#" },
  { icon: LogOut, label: "Log Out", path: "#", destructive: true },
];

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Profile" />

      <div className="px-4 pt-6 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
          <User className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-lg font-heading font-bold text-foreground mt-3">Guest User</h2>
        <p className="text-xs text-muted-foreground">guest@duxtHealth.com</p>

        {/* DuxtCoin Balance */}
        <div className="mt-4 bg-card rounded-xl border border-border p-4 w-full flex items-center justify-between shadow-card">
          <div className="flex items-center gap-2">
            <img src={duxtcoinImg} alt="DuxtCoin" width={28} height={28} />
            <div>
              <p className="text-xs text-muted-foreground">DuxtCoin Balance</p>
              <p className="text-lg font-bold text-foreground">1,250 DXT</p>
            </div>
          </div>
          <button className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">Top Up</button>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-6 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-muted transition-colors ${
              item.destructive ? "text-destructive" : "text-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
