import { Link } from "react-router-dom";

interface ServiceCardProps {
  image: string;
  title: string;
  to?: string;
  className?: string;
  size?: "small" | "medium" | "large";
}

const ServiceCard = ({ image, title, to = "/", className = "", size = "medium" }: ServiceCardProps) => {
  const heightMap = {
    small: "h-48",
    medium: "h-64",
    large: "h-80",
  };

  return (
    <Link to={to} className={`service-card group block ${heightMap[size]} ${className}`}>
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="service-card-overlay">
        <h3 className="font-display text-lg sm:text-xl font-bold text-primary-foreground uppercase tracking-wide">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default ServiceCard;
