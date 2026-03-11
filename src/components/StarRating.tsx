import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating = ({ rating, size = 14 }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${star <= Math.floor(rating) ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
          style={{ width: size, height: size }}
        />
      ))}
      <span className="text-xs font-semibold text-foreground ml-1">{rating}</span>
    </div>
  );
};

export default StarRating;
