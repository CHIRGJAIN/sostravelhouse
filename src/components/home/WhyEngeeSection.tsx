import { Shield, Eye, Headphones, Star } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Shield, title: "Verified Operator", desc: "Licensed and trusted tour operator with 20+ years of experience." },
  { icon: Eye, title: "Transparent Pricing", desc: "No hidden fees. What you see is what you pay, always." },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated travel experts available round the clock for assistance." },
  { icon: Star, title: "Curated Experiences", desc: "Handpicked hotels, unique activities, and authentic local experiences." },
];

export default function WhyEngeeSection() {
  return (
    <section className="bg-muted/50 py-16 md:py-24" aria-labelledby="why-heading">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 id="why-heading" className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Why Jayambe Holidays?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            We go beyond the ordinary to deliver extraordinary travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group card-surface card-interactive card-accent p-6"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

