import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tours, themes as allThemes, destinations as allDest } from "@/data/mockData";
import TourCard from "@/components/tours/TourCard";
import { motion, AnimatePresence } from "framer-motion";
import { useShortlist } from "@/contexts/ShortlistContext";
import { formatINR } from "@/lib/format";
import PageHeader from "@/components/layout/PageHeader";

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "duration", label: "Duration" },
];

export default function Tours() {
  const [searchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [selectedDest, setSelectedDest] = useState<string[]>(() => {
    const s = searchParams.get("search");
    return s ? [s] : [];
  });
  const [selectedThemes, setSelectedThemes] = useState<string[]>(() => {
    const t = searchParams.get("theme");
    return t ? [t] : [];
  });
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 200000]);
  const [durationRange, setDurationRange] = useState<[number, number]>([1, 15]);
  const [flightIncluded, setFlightIncluded] = useState(false);
  const [visaAssistance, setVisaAssistance] = useState(false);
  const [dealsOnly, setDealsOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const { items } = useShortlist();

  const filteredTours = useMemo(() => {
    let result = [...tours];
    if (selectedDest.length > 0) result = result.filter(t => selectedDest.some(d => t.destination.toLowerCase().includes(d.toLowerCase()) || t.title.toLowerCase().includes(d.toLowerCase())));
    if (selectedThemes.length > 0) result = result.filter(t => t.themes.some(th => selectedThemes.includes(th)));
    if (selectedCategory) result = result.filter(t => t.category === selectedCategory);
    result = result.filter(t => t.pricePerPerson >= budgetRange[0] && t.pricePerPerson <= budgetRange[1]);
    result = result.filter(t => t.durationDays >= durationRange[0] && t.durationDays <= durationRange[1]);
    if (flightIncluded) result = result.filter(t => t.flightIncluded);
    if (visaAssistance) result = result.filter(t => t.visaAssistance);
    if (dealsOnly) result = result.filter(t => t.dealPercent > 0);

    switch (sort) {
      case "price-low": result.sort((a, b) => a.pricePerPerson - b.pricePerPerson); break;
      case "price-high": result.sort((a, b) => b.pricePerPerson - a.pricePerPerson); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "duration": result.sort((a, b) => a.durationDays - b.durationDays); break;
    }
    return result;
  }, [selectedDest, selectedThemes, selectedCategory, budgetRange, durationRange, flightIncluded, visaAssistance, dealsOnly, sort]);

  const applyFilter = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
    setFiltersOpen(false);
  };

  const clearFilters = () => {
    setSelectedDest([]);
    setSelectedThemes([]);
    setSelectedCategory("");
    setBudgetRange([0, 200000]);
    setDurationRange([1, 15]);
    setFlightIncluded(false);
    setVisaAssistance(false);
    setDealsOnly(false);
  };

  const toggleItem = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h4 className="mb-2 font-heading text-sm font-semibold text-foreground">Category</h4>
        <div className="flex flex-wrap gap-2">
          {["Domestic", "International"].map(c => (
            <button key={c} onClick={() => setSelectedCategory(selectedCategory === c ? "" : c)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${selectedCategory === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations */}
      <div>
        <h4 className="mb-2 font-heading text-sm font-semibold text-foreground">Destinations</h4>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {allDest.slice(0, 12).map(d => (
            <button key={d} onClick={() => setSelectedDest(toggleItem(selectedDest, d))}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${selectedDest.includes(d) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Themes */}
      <div>
        <h4 className="mb-2 font-heading text-sm font-semibold text-foreground">Themes</h4>
        <div className="flex flex-wrap gap-2">
          {allThemes.map(t => (
            <button key={t} onClick={() => setSelectedThemes(toggleItem(selectedThemes, t))}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${selectedThemes.includes(t) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <h4 className="mb-2 font-heading text-sm font-semibold text-foreground">
          Budget: {formatINR(budgetRange[0])} - {formatINR(budgetRange[1])}
        </h4>
        <input type="range" min="0" max="200000" step="5000" value={budgetRange[1]}
          onChange={e => setBudgetRange([budgetRange[0], parseInt(e.target.value)])}
          className="w-full accent-primary" aria-label="Budget range" />
      </div>

      {/* Duration */}
      <div>
        <h4 className="mb-2 font-heading text-sm font-semibold text-foreground">
          Duration: {durationRange[0]} - {durationRange[1]} days
        </h4>
        <input type="range" min="1" max="15" step="1" value={durationRange[1]}
          onChange={e => setDurationRange([durationRange[0], parseInt(e.target.value)])}
          className="w-full accent-primary" aria-label="Duration range" />
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        {[
          { label: "Flight Included", value: flightIncluded, set: setFlightIncluded },
          { label: "Visa Assistance", value: visaAssistance, set: setVisaAssistance },
          { label: "Deals Only", value: dealsOnly, set: setDealsOnly },
        ].map(toggle => (
          <label key={toggle.label} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input type="checkbox" checked={toggle.value} onChange={e => toggle.set(e.target.checked)}
              className="rounded border-border accent-primary" />
            {toggle.label}
          </label>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={applyFilter} className="flex-1 rounded-xl">Apply</Button>
        <Button onClick={clearFilters} variant="outline" className="rounded-xl">Clear</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Explore Our Tours" subtitle={`${filteredTours.length} tours found`} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24 card-surface p-6">
              <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">Filters</h3>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <Button onClick={() => setFiltersOpen(true)} variant="outline" className="gap-2 rounded-xl lg:hidden">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </Button>

              <div className="relative ml-auto">
                <select value={sort} onChange={e => setSort(e.target.value)}
                  className="appearance-none rounded-xl border border-border bg-card px-4 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Sort tours"
                >
                  {sortOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="overflow-hidden card-surface">
                    <div className="aspect-[4/3] animate-pulse bg-muted" />
                    <div className="space-y-3 p-5">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                      <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredTours.length === 0 ? (
              <div className="py-20 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">No tours found</h3>
                <p className="mt-2 text-muted-foreground">Try adjusting your filters</p>
                <Button onClick={clearFilters} variant="outline" className="mt-4 rounded-xl">Clear Filters</Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredTours.map((tour, i) => (
                  <motion.div key={tour.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <TourCard tour={tour} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Shortlist Panel */}
          {items.length > 0 && (
            <aside className="hidden w-64 shrink-0 xl:block">
              <div className="sticky top-24 card-surface p-4">
                <h3 className="font-heading text-sm font-semibold text-foreground">
                  Shortlist ({items.length})
                </h3>
                <div className="mt-3 space-y-2">
                  {items.slice(0, 3).map(item => (
                    <div key={item.tour.id} className="flex items-center gap-2 rounded-lg bg-muted p-2">
                      <img src={item.tour.images[0]} alt="" className="h-10 w-10 rounded object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-foreground">{item.tour.title}</p>
                        <p className="text-[10px] text-muted-foreground">{formatINR(item.tour.pricePerPerson)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs font-semibold text-foreground">
                  Est. Total: {formatINR(items.reduce((s, i) => s + i.tour.pricePerPerson * i.adults, 0))}
                </p>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/50" onClick={() => setFiltersOpen(false)} />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 top-0 z-50 w-80 overflow-y-auto bg-card p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold text-foreground">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X className="h-5 w-5 text-muted-foreground" /></button>
              </div>
              <FilterContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
