import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useShortlist } from "@/contexts/ShortlistContext";
import { formatDate, formatINR } from "@/lib/format";
import { Tour } from "@/data/mockData";

const rows: Array<{ label: string; render: (tour: Tour) => ReactNode }> = [
  { label: "Price per person", render: (tour) => formatINR(tour.pricePerPerson) },
  { label: "Duration", render: (tour) => `${tour.durationDays} days / ${tour.durationDays - 1} nights` },
  { label: "Next available", render: (tour) => formatDate(tour.nextAvailableDate) },
  { label: "Group size", render: (tour) => `${tour.maxGroupSize} travelers` },
  { label: "Themes", render: (tour) => tour.themes.slice(0, 4).join(", ") },
  { label: "Highlights", render: (tour) => (
    <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
      {tour.highlights.slice(0, 4).map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  ) },
  { label: "Inclusions", render: (tour) => (
    <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
      {tour.inclusions.slice(0, 4).map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  ) },
];

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare } = useShortlist();

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Compare Tours" subtitle="Select up to three tours to compare side by side." />
        <div className="container mx-auto px-4 py-12">
          <div className="card-surface p-10 text-center">
            <h2 className="font-heading text-xl font-semibold text-foreground">No tours to compare yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse tours and add them to compare. You can compare up to three tours at a time.
            </p>
            <Link to="/tours">
              <Button className="mt-6 rounded-xl">Browse Tours</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const columns = `minmax(180px, 220px) repeat(${compareList.length}, minmax(220px, 1fr))`;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Compare Tours"
        subtitle={`Comparing ${compareList.length} tour${compareList.length > 1 ? "s" : ""}`}
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          Up to 3 tours
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Tip: Use this view to compare pricing, inclusions, and highlights before you book.
          </p>
          <Button variant="outline" className="rounded-xl" onClick={clearCompare}>Clear Compare</Button>
        </div>

        <div className="overflow-x-auto">
          <div
            className="grid gap-px rounded-2xl border border-border bg-border"
            style={{ gridTemplateColumns: columns }}
          >
            <div className="bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tour
            </div>
            {compareList.map((tour) => (
              <div key={tour.id} className="bg-card p-4">
                <img src={tour.images[0]} alt={tour.title} className="h-32 w-full rounded-xl object-cover" />
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">{tour.title}</p>
                    <p className="text-xs text-muted-foreground">{tour.destination}, {tour.country}</p>
                  </div>
                  <button
                    onClick={() => removeFromCompare(tour.id)}
                    className="rounded-full border border-border p-1 text-muted-foreground hover:text-destructive"
                    aria-label="Remove from compare"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <Link to={`/tours/${tour.slug}`} className="mt-3 inline-flex text-xs font-medium text-primary hover:underline">
                  View details
                </Link>
              </div>
            ))}

            {rows.map((row) => (
              <div key={row.label} className="contents">
                <div className="bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground">
                  {row.label}
                </div>
                {compareList.map((tour) => (
                  <div key={`${row.label}-${tour.id}`} className="bg-card px-4 py-3 text-sm text-foreground">
                    {row.render(tour)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
