import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-travel.jpg";
import { destinations } from "@/data/mockData";

const floatingChips = ["Maldives", "Bali", "Switzerland", "Dubai", "Kashmir", "Thailand", "Paris", "Goa"];

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredDest = destinations.filter(d =>
    d.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  return (
    <section className="hero-theme relative min-h-[90vh] overflow-hidden" aria-label="Hero section">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Beautiful travel destination" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Floating Chips */}
      <div className="absolute inset-0 hidden lg:block">
        {floatingChips.map((chip, i) => (
          <motion.div
            key={chip}
            className={`absolute rounded-full bg-card/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary-foreground border border-card/10 ${i % 2 === 0 ? "animate-float" : "animate-float-delay"}`}
            style={{
              top: `${15 + (i % 4) * 20}%`,
              left: i < 4 ? `${5 + i * 8}%` : undefined,
              right: i >= 4 ? `${5 + (i - 4) * 8}%` : undefined,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.15 }}
          >
            {chip}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative flex min-h-[90vh] items-center">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-card/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary-foreground border border-card/10">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Trusted by 50,000+ happy travelers
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 font-heading text-4xl font-extrabold leading-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Explore the world with{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                  SOS Travel house
                </span>
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-primary-foreground/80 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Premium curated tours across the globe. From serene beaches to majestic mountains,
              we craft experiences that last a lifetime.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="mx-auto mt-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <div className="relative">
                <div className="flex items-center overflow-hidden rounded-2xl bg-card/95 backdrop-blur-xl shadow-xl border border-card/20">
                  <Search className="ml-4 h-5 w-5 shrink-0 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search destinations, tours, themes..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="flex-1 bg-transparent px-3 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                    aria-label="Search destinations"
                  />
                  <Link to={`/tours${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""}`}>
                    <Button className="mr-1.5 rounded-xl" size="sm">
                      Search
                    </Button>
                  </Link>
                </div>

                {/* Suggestions */}
                {showSuggestions && searchQuery && filteredDest.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl bg-card shadow-xl border border-border">
                    {filteredDest.map(d => (
                      <Link
                        key={d}
                        to={`/tours?search=${encodeURIComponent(d)}`}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                      >
                        <Search className="h-4 w-4 text-muted-foreground" />
                        {d}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/tours">
                <Button size="lg" className="rounded-xl px-8 text-base font-semibold shadow-lg">
                  Explore Tours
                </Button>
              </Link>
              <Link to="/custom-trip">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-primary-foreground/30 px-8 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  Plan Custom Trip
                </Button>
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-12 flex justify-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="h-6 w-6 text-primary-foreground/50" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

