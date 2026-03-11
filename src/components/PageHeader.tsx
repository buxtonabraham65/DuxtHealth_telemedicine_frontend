import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  balance?: string;
}

const PageHeader = ({ title, subtitle, balance }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="text-center flex-1">
          <h1 className="text-base font-heading font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {balance ? (
          <span className="text-xs font-semibold text-secondary">{balance}</span>
        ) : (
          <div className="w-10" />
        )}
      </div>
    </div>
  );
};

export default PageHeader;
