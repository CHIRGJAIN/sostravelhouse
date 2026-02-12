import { Link } from "react-router-dom";
import { type ElementType } from "react";
import { categories } from "@/data/mockData";
import { motion } from "framer-motion";
import { Calendar, Crown, Heart, Home, MapPin, Mountain, Plane, Users, Users2 } from "lucide-react";

const categoryIcons: Record<string, ElementType> = {
  Domestic: Home,
  International: Plane,
  Honeymoon: Heart,
  Family: Users,
  Adventure: Mountain,
  "Group Tours": Users2,
  "Weekend Getaways": Calendar,
  Luxury: Crown,
};

export default function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="categories-heading">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 id="categories-heading" className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Explore by Category
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Find the perfect trip for every occasion
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {categories.map((cat, i) => {
            const Icon = categoryIcons[cat.name] ?? MapPin;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/tours?category=${encodeURIComponent(cat.name)}`}
                  className="group flex flex-col items-center gap-3 card-surface card-interactive card-accent p-6 hover:border-primary/30"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-heading text-sm font-semibold text-foreground">{cat.name}</h3>
                  <span className="text-xs text-muted-foreground">{cat.count} tours</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
