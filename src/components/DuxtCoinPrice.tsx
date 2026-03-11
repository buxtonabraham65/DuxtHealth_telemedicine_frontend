import duxtcoinImg from "@/assets/duxtcoin.png";

interface DuxtCoinPriceProps {
  amount: number;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const imgSizes = {
  sm: 14,
  md: 18,
  lg: 22,
};

const DuxtCoinPrice = ({ amount, size = "md" }: DuxtCoinPriceProps) => {
  return (
    <span className={`inline-flex items-center gap-1 font-semibold text-gold-foreground ${sizeClasses[size]}`}>
      <img src={duxtcoinImg} alt="DuxtCoin" width={imgSizes[size]} height={imgSizes[size]} className="inline-block" />
      {amount} DXT
    </span>
  );
};

export default DuxtCoinPrice;
