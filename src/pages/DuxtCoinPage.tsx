import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Pickaxe,
  TrendingUp,
  TrendingDown,
  Clock,
  ChevronRight,
  Zap,
  DollarSign,
  ArrowRightLeft,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import DuxtCoinPrice from "@/components/DuxtCoinPrice";
import duxtcoinImg from "@/assets/duxtcoin.png";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Tab = "wallet" | "exchange" | "mining" | "history";

const mockTransactions = [
  { id: "1", type: "received" as const, amount: 150, from: "Dr. Kwame Asante", date: "Mar 7, 2026", status: "completed" as const },
  { id: "2", type: "sent" as const, amount: 50, to: "Pharmacy Order #412", date: "Mar 6, 2026", status: "completed" as const },
  { id: "3", type: "mined" as const, amount: 12, date: "Mar 5, 2026", status: "completed" as const },
  { id: "4", type: "bought" as const, amount: 500, usdSpent: 25, date: "Mar 4, 2026", status: "completed" as const },
  { id: "5", type: "exchanged" as const, amount: 200, usdReceived: 10, date: "Mar 3, 2026", status: "completed" as const },
  { id: "6", type: "sent" as const, amount: 30, to: "Lab Test Payment", date: "Mar 2, 2026", status: "pending" as const },
  { id: "7", type: "mined" as const, amount: 8, date: "Mar 1, 2026", status: "completed" as const },
];

const DuxtCoinPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("wallet");
  const [exchangeDirection, setExchangeDirection] = useState<"buy" | "sell">("buy");
  const [exchangeAmount, setExchangeAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [isMining, setIsMining] = useState(false);
  const [minedAmount, setMinedAmount] = useState(0);
  const [hashRate, setHashRate] = useState(0);

  const DXT_RATE = 0.05; // 1 DXT = $0.05
  const balance = 1250;
  const usdValue = (balance * DXT_RATE).toFixed(2);

  const handleExchange = () => {
    if (!exchangeAmount || parseFloat(exchangeAmount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (exchangeDirection === "buy") {
      const dxt = parseFloat(exchangeAmount) / DXT_RATE;
      toast.success(`Purchased ${dxt.toFixed(0)} DXT for $${exchangeAmount}`);
    } else {
      const usd = parseFloat(exchangeAmount) * DXT_RATE;
      toast.success(`Exchanged ${exchangeAmount} DXT for $${usd.toFixed(2)}`);
    }
    setExchangeAmount("");
  };

  const handleSend = () => {
    if (!sendAddress || !sendAmount) {
      toast.error("Fill in all fields");
      return;
    }
    toast.success(`Sent ${sendAmount} DXT successfully`);
    setSendAddress("");
    setSendAmount("");
  };

  const toggleMining = () => {
    if (isMining) {
      setIsMining(false);
      setHashRate(0);
      toast.info(`Mining stopped. You earned ${minedAmount} DXT this session.`);
    } else {
      setIsMining(true);
      setMinedAmount(0);
      // Simulate mining
      const interval = setInterval(() => {
        setHashRate(Math.floor(Math.random() * 50) + 20);
        setMinedAmount((prev) => {
          const earned = prev + (Math.random() * 0.5);
          return parseFloat(earned.toFixed(2));
        });
      }, 2000);
      // Store interval reference for cleanup
      setTimeout(() => {
        clearInterval(interval);
        setIsMining(false);
        setHashRate(0);
      }, 60000); // Auto-stop after 1 min
      toast.success("Mining started! Earning DXT...");
    }
  };

  const tabs: { id: Tab; label: string; icon: typeof DollarSign }[] = [
    { id: "wallet", label: "Wallet", icon: DollarSign },
    { id: "exchange", label: "Exchange", icon: ArrowRightLeft },
    { id: "mining", label: "Mining", icon: Pickaxe },
    { id: "history", label: "History", icon: Clock },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "received": return <ArrowDownLeft className="w-4 h-4 text-success" />;
      case "sent": return <ArrowUpRight className="w-4 h-4 text-destructive" />;
      case "mined": return <Pickaxe className="w-4 h-4 text-gold" />;
      case "bought": return <TrendingUp className="w-4 h-4 text-success" />;
      case "exchanged": return <RefreshCw className="w-4 h-4 text-secondary" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTransactionLabel = (tx: typeof mockTransactions[0]) => {
    switch (tx.type) {
      case "received": return `Received from ${tx.from}`;
      case "sent": return `Sent to ${tx.to}`;
      case "mined": return "Mining Reward";
      case "bought": return `Bought with $${tx.usdSpent}`;
      case "exchanged": return `Exchanged for $${tx.usdReceived}`;
      default: return "Transaction";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="DuxtCoin" subtitle="Blockchain Wallet" balance={`${balance.toLocaleString()} DXT`} />

      {/* Balance Card */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-primary rounded-2xl p-5 text-center">
          <img src={duxtcoinImg} alt="DuxtCoin" width={48} height={48} className="mx-auto mb-2" />
          <p className="text-xs text-primary-foreground/70">Total Balance</p>
          <h2 className="text-3xl font-heading font-bold text-primary-foreground">{balance.toLocaleString()} DXT</h2>
          <p className="text-sm text-primary-foreground/80 mt-1">≈ ${usdValue} USD</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3 text-success" />
            <span className="text-xs text-success">+2.4% today</span>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { icon: ArrowUpRight, label: "Send", action: () => setActiveTab("wallet") },
              { icon: ArrowDownLeft, label: "Receive", action: () => toast.info("Your wallet address: DXT-7Om3u7...knh") },
              { icon: ArrowRightLeft, label: "Exchange", action: () => setActiveTab("exchange") },
            ].map((action) => (
              <button
                key={action.label}
                onClick={action.action}
                className="flex flex-col items-center gap-1.5 bg-primary-foreground/15 rounded-xl py-3 hover:bg-primary-foreground/25 transition-colors"
              >
                <action.icon className="w-5 h-5 text-primary-foreground" />
                <span className="text-[10px] font-medium text-primary-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-5">
        <div className="flex gap-1 bg-muted rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-card"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 mt-4 animate-fade-in">
        {/* Wallet Tab - Send/Receive */}
        {activeTab === "wallet" && (
          <div className="space-y-4">
            {/* Send DXT */}
            <div className="bg-card rounded-xl border border-border p-4 shadow-card">
              <h3 className="text-sm font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-secondary" />
                Send DuxtCoins
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-foreground">Recipient Address / Username</label>
                  <input
                    type="text"
                    placeholder="DXT-xxxxxxxx or @username"
                    value={sendAddress}
                    onChange={(e) => setSendAddress(e.target.value)}
                    className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Amount (DXT)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground"
                  />
                  {sendAmount && (
                    <p className="text-[10px] text-muted-foreground mt-1">
                      ≈ ${(parseFloat(sendAmount || "0") * DXT_RATE).toFixed(2)} USD
                    </p>
                  )}
                </div>
                <Button onClick={handleSend} className="w-full bg-gradient-primary text-primary-foreground font-bold rounded-xl h-11 text-sm">
                  Send DXT
                </Button>
              </div>
            </div>

            {/* Receive DXT */}
            <div className="bg-card rounded-xl border border-border p-4 shadow-card">
              <h3 className="text-sm font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                <ArrowDownLeft className="w-4 h-4 text-success" />
                Receive DuxtCoins
              </h3>
              <div className="text-center py-3">
                <div className="w-32 h-32 bg-muted rounded-xl mx-auto flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <img src={duxtcoinImg} alt="DuxtCoin" width={32} height={32} className="mx-auto mb-1" />
                    <p className="text-[9px] text-muted-foreground">QR Code</p>
                  </div>
                </div>
                <p className="text-xs font-mono text-muted-foreground mt-3 bg-muted rounded-lg px-3 py-2">
                  DXT-7Om3u7SIygXmZ75CXZ
                </p>
                <Button
                  variant="outline"
                  className="mt-2 text-xs"
                  onClick={() => {
                    navigator.clipboard.writeText("DXT-7Om3u7SIygXmZ75CXZ");
                    toast.success("Address copied!");
                  }}
                >
                  Copy Address
                </Button>
              </div>
            </div>

            {/* Recent */}
            <div className="bg-card rounded-xl border border-border p-4 shadow-card">
              <h3 className="text-sm font-heading font-bold text-foreground mb-3">Recent Activity</h3>
              {mockTransactions.slice(0, 3).map((tx) => (
                <div key={tx.id} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    {getTransactionIcon(tx.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{getTransactionLabel(tx)}</p>
                    <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${tx.type === "sent" || tx.type === "exchanged" ? "text-destructive" : "text-success"}`}>
                      {tx.type === "sent" || tx.type === "exchanged" ? "-" : "+"}{tx.amount} DXT
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exchange Tab */}
        {activeTab === "exchange" && (
          <div className="space-y-4">
            {/* Rate Info */}
            <div className="bg-card rounded-xl border border-border p-4 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Current Rate</p>
                  <p className="text-lg font-heading font-bold text-foreground">1 DXT = $0.05</p>
                </div>
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-semibold">+2.4%</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[
                  { label: "24h High", value: "$0.052" },
                  { label: "24h Low", value: "$0.048" },
                  { label: "Volume", value: "1.2M" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-muted rounded-lg p-2 text-center">
                    <p className="text-[9px] text-muted-foreground">{stat.label}</p>
                    <p className="text-xs font-bold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Exchange Direction Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setExchangeDirection("buy")}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                  exchangeDirection === "buy"
                    ? "bg-success text-success-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                Buy DXT
              </button>
              <button
                onClick={() => setExchangeDirection("sell")}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                  exchangeDirection === "sell"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                Sell DXT
              </button>
            </div>

            {/* Exchange Form */}
            <div className="bg-card rounded-xl border border-border p-4 shadow-card">
              <h3 className="text-sm font-heading font-bold text-foreground mb-3">
                {exchangeDirection === "buy" ? "Buy DuxtCoins" : "Sell DuxtCoins"}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-foreground">
                    {exchangeDirection === "buy" ? "Amount (USD)" : "Amount (DXT)"}
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={exchangeAmount}
                    onChange={(e) => setExchangeAmount(e.target.value)}
                    className="w-full mt-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 border border-border outline-none focus:border-secondary placeholder:text-muted-foreground"
                  />
                </div>
                {exchangeAmount && (
                  <div className="bg-muted rounded-lg p-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">You will receive</span>
                    <span className="text-sm font-bold text-foreground">
                      {exchangeDirection === "buy"
                        ? `${(parseFloat(exchangeAmount) / DXT_RATE).toFixed(0)} DXT`
                        : `$${(parseFloat(exchangeAmount) * DXT_RATE).toFixed(2)}`}
                    </span>
                  </div>
                )}
                <Button onClick={handleExchange} className="w-full bg-gradient-primary text-primary-foreground font-bold rounded-xl h-11 text-sm">
                  {exchangeDirection === "buy" ? "Buy DuxtCoins" : "Sell DuxtCoins"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mining Tab */}
        {activeTab === "mining" && (
          <div className="space-y-4">
            {/* Mining Status */}
            <div className={`rounded-2xl p-5 text-center ${isMining ? "bg-gradient-accent" : "bg-card border border-border shadow-card"}`}>
              <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-3 ${
                isMining ? "bg-accent-foreground/20 animate-pulse-soft" : "bg-muted"
              }`}>
                <Pickaxe className={`w-10 h-10 ${isMining ? "text-accent-foreground" : "text-muted-foreground"}`} />
              </div>
              <h3 className={`text-lg font-heading font-bold ${isMining ? "text-accent-foreground" : "text-foreground"}`}>
                {isMining ? "Mining Active" : "Mining Stopped"}
              </h3>
              <p className={`text-xs mt-1 ${isMining ? "text-accent-foreground/80" : "text-muted-foreground"}`}>
                {isMining ? "Your device is earning DXT" : "Start mining to earn DuxtCoins"}
              </p>

              <Button
                onClick={toggleMining}
                className={`mt-4 font-bold rounded-xl h-12 px-8 ${
                  isMining
                    ? "bg-card text-destructive hover:bg-card/90"
                    : "bg-gradient-primary text-primary-foreground"
                }`}
              >
                <Zap className="w-4 h-4 mr-1" />
                {isMining ? "Stop Mining" : "Start Mining"}
              </Button>
            </div>

            {/* Mining Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Hash Rate", value: isMining ? `${hashRate} H/s` : "0 H/s", icon: Zap },
                { label: "Session Earned", value: `${minedAmount} DXT`, icon: Pickaxe },
                { label: "Total Mined", value: "342 DXT", icon: TrendingUp },
                { label: "Mining Rank", value: "#1,247", icon: TrendingDown },
              ].map((stat) => (
                <div key={stat.label} className="bg-card rounded-xl border border-border p-3 shadow-card">
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="text-sm font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Mining Info */}
            <div className="bg-card rounded-xl border border-border p-4 shadow-card">
              <h3 className="text-sm font-heading font-bold text-foreground mb-2">How Mining Works</h3>
              <div className="space-y-2">
                {[
                  "DuxtCoin uses a proof-of-stake mining algorithm optimized for mobile devices.",
                  "Mining rewards are distributed every 2 minutes based on your hash rate contribution.",
                  "Higher hash rates earn more DXT. Keep the app active for best results.",
                  "Earned DXT is automatically credited to your wallet balance.",
                ].map((info, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-[10px] text-secondary font-bold mt-0.5">{i + 1}.</span>
                    <p className="text-[11px] text-muted-foreground">{info}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="bg-card rounded-xl border border-border shadow-card">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-heading font-bold text-foreground">Transaction History</h3>
            </div>
            <div className="divide-y divide-border">
              {mockTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                    {getTransactionIcon(tx.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{getTransactionLabel(tx)}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                      <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${
                        tx.status === "completed"
                          ? "bg-success/10 text-success"
                          : "bg-gold/10 text-gold-foreground"
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${tx.type === "sent" || tx.type === "exchanged" ? "text-destructive" : "text-success"}`}>
                      {tx.type === "sent" || tx.type === "exchanged" ? "-" : "+"}{tx.amount} DXT
                    </p>
                    <p className="text-[9px] text-muted-foreground">
                      ≈ ${(tx.amount * DXT_RATE).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default DuxtCoinPage;
