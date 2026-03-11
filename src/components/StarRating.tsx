import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i));
        return (
          <div key={i} className="relative w-3.5 h-3.5">
            <Star size={14} className="text-muted-foreground/30" />
            {fill > 0 && (
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star size={14} className="text-foreground fill-foreground" />
              </div>
            )}
          </div>
        );
      })}
      <span className="text-xs font-body text-muted-foreground ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}
