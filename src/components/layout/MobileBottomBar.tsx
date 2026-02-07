import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, Phone, BarChart2 } from "lucide-react";
import { useShortlist } from "@/contexts/ShortlistContext";

const mobileNav = [
  { name: "Home", path: "/", icon: Home },
  { name: "Tours", path: "/tours", icon: Search },
  { name: "Shortlist", path: "/shortlist", icon: Heart },
  { name: "Compare", path: "/compare", icon: BarChart2 },
  { name: "Contact", path: "/contact", icon: Phone },
];

export default function MobileBottomBar() {
  const location = useLocation();
  const { items, compareList } = useShortlist();
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl lg:hidden" aria-label="Mobile bottom navigation">
      <div className="flex items-center justify-around py-2">
        {mobileNav.map(({ name, path, icon: Icon }) => {
          const active = isActive(path);
          return (
            <Link
              key={path}
              to={path}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
              aria-label={name}
            >
              <Icon className="h-5 w-5" />
              {name}
              {name === "Shortlist" && items.length > 0 && (
                <span className="absolute -right-0.5 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">
                  {items.length}
                </span>
              )}
              {name === "Compare" && compareList.length > 0 && (
                <span className="absolute -right-0.5 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
                  {compareList.length}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
