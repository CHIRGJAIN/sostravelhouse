import { Link } from "react-router-dom";
import { Star, Clock, Heart, Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tours } from "@/data/mockData";
import { useShortlist } from "@/contexts/ShortlistContext";
import { motion } from "framer-motion";

export default function PopularPackages() {
  const { addItem, removeItem, isInShortlist } = useShortlist();
  const popular = tours.slice(0, 6);

  return (
    <section className="py-16 md:py-24" aria-labelledby="popular-heading">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 id="popular-heading" className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Popular Packages
            </h2>
            <p className="mt-2 text-muted-foreground">Handpicked tours loved by our travelers</p>
          </div>
          <Link to="/tours" className="hidden text-sm font-medium text-primary hover:underline sm:block">
            View all tours →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((tour, i) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />

                {tour.dealPercent > 0 && (
                  <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
                    {tour.dealPercent}% OFF
                  </span>
                )}

                <button
                  onClick={() => isInShortlist(tour.id) ? removeItem(tour.id) : addItem(tour)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
                  aria-label={isInShortlist(tour.id) ? "Remove from shortlist" : "Add to shortlist"}
                >
                  <Heart className={`h-4 w-4 ${isInShortlist(tour.id) ? "fill-destructive text-destructive" : "text-foreground"}`} />
                </button>

                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-primary-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">{tour.destination}, {tour.country}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-semibold text-foreground">{tour.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({tour.reviewCount} reviews)</span>
                  <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {tour.durationDays}D/{tour.durationDays - 1}N
                  </div>
                </div>

                <h3 className="mt-2 font-heading text-lg font-semibold text-foreground line-clamp-1">
                  {tour.title}
                </h3>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {tour.themes.slice(0, 3).map(t => (
                    <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    {tour.dealPercent > 0 && (
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{Math.round(tour.pricePerPerson / (1 - tour.dealPercent / 100)).toLocaleString()}
                      </span>
                    )}
                    <p className="text-lg font-bold text-foreground">
                      ₹{tour.pricePerPerson.toLocaleString()}
                      <span className="text-xs font-normal text-muted-foreground">/person</span>
                    </p>
                  </div>
                  <Link to={`/tours/${tour.slug}`}>
                    <Button size="sm" variant="outline" className="gap-1.5 rounded-xl text-xs">
                      <Eye className="h-3.5 w-3.5" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/tours">
            <Button variant="outline" className="rounded-xl">View All Tours</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
