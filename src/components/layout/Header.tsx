import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Heart, MapPin, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShortlist } from "@/contexts/ShortlistContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Tours", path: "/tours" },
  { name: "Destinations", path: "/destinations" },
  { name: "Custom Trip", path: "/custom-trip" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { items, compareList } = useShortlist();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold leading-tight text-foreground">Amma</span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-primary">Yatra</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/compare" className="relative">
              <Button variant="ghost" size="icon" aria-label="Compare">
                <BarChart2 className="h-5 w-5" />
                {compareList.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {compareList.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/shortlist" className="relative">
              <Button variant="ghost" size="icon" aria-label="Shortlist">
                <Heart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
            <a href="tel:9000000000">
              <Button variant="default" size="sm" className="gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden xl:inline">Call Now</span>
              </Button>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/shortlist" className="relative">
              <Button variant="ghost" size="icon" aria-label="Shortlist">
                <Heart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/50 lg:hidden"
          >
            <nav className="container mx-auto space-y-1 px-4 py-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a href="tel:9000000000" className="block">
                <Button className="mt-2 w-full gap-2">
                  <Phone className="h-4 w-4" /> Call 9000000000
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
