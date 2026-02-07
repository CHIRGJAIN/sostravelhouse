import { Star } from "lucide-react";
import { reviews } from "@/data/mockData";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/format";

export default function ReviewsSection() {
  return (
    <section className="bg-muted/50 py-16 md:py-24" aria-labelledby="reviews-heading">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 id="reviews-heading" className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            What Our Travelers Say
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">4.7/5</span>
            <span className="text-sm text-muted-foreground">from 2,000+ reviews</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-surface card-accent p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.destination} Trip</p>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                "{review.comment}"
              </p>
              <p className="mt-3 text-xs text-muted-foreground">{formatDate(review.date)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
