import { Link } from "react-router-dom";
import { Star, Clock, Heart, MapPin, Eye, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tour } from "@/data/mockData";
import { useShortlist } from "@/contexts/ShortlistContext";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";

interface Props {
  tour: Tour;
  className?: string;
}

export default function TourCard({ tour, className }: Props) {
  const { addItem, removeItem, isInShortlist, addToCompare, removeFromCompare, isInCompare } = useShortlist();
  const shortlisted = isInShortlist(tour.id);
  const compared = isInCompare(tour.id);

  return (
    <div className={cn("group overflow-hidden card-surface card-interactive card-accent", className)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={tour.images[0]} alt={tour.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />

        {tour.dealPercent > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
            {tour.dealPercent}% OFF
          </span>
        )}

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            onClick={() => shortlisted ? removeItem(tour.id) : addItem(tour)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
            aria-label={shortlisted ? "Remove from shortlist" : "Add to shortlist"}
          >
            <Heart className={`h-4 w-4 ${shortlisted ? "fill-destructive text-destructive" : "text-foreground"}`} />
          </button>
          <button
            onClick={() => (compared ? removeFromCompare(tour.id) : addToCompare(tour))}
            className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-colors hover:bg-card ${compared ? "bg-primary text-primary-foreground" : "bg-card/80 text-foreground"}`}
            aria-label={compared ? "Remove from compare" : "Add to compare"}
          >
            <BarChart2 className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-primary-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-sm font-medium">{tour.destination}, {tour.country}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold text-foreground">{tour.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({tour.reviewCount})</span>
          <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {tour.durationDays}D/{tour.durationDays - 1}N
          </div>
        </div>

        <h3 className="mt-2 font-heading text-base font-semibold text-foreground line-clamp-1">{tour.title}</h3>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {tour.themes.slice(0, 3).map(t => (
            <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{t}</span>
          ))}
          {tour.flightIncluded && <span className="rounded-full bg-teal-light px-2 py-0.5 text-[10px] font-medium text-primary">{"\u2708"} Flight</span>}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            {tour.dealPercent > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatINR(Math.round(tour.pricePerPerson / (1 - tour.dealPercent / 100)))}
              </span>
            )}
            <p className="text-lg font-bold text-foreground">
              {formatINR(tour.pricePerPerson)}
              <span className="text-xs font-normal text-muted-foreground">/person</span>
            </p>
          </div>
          <Link to={`/tours/${tour.slug}`}>
            <Button size="sm" variant="outline" className="gap-1.5 rounded-xl text-xs">
              <Eye className="h-3.5 w-3.5" /> View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
