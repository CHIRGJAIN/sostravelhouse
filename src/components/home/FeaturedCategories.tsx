import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";
import { motion } from "framer-motion";

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
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/tours?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
              >
                <span className="text-4xl">{cat.icon}</span>
                <h3 className="font-heading text-sm font-semibold text-foreground">{cat.name}</h3>
                <span className="text-xs text-muted-foreground">{cat.count} tours</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
