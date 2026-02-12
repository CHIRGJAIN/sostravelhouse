import { Link } from "react-router-dom";
import { Globe, Plane, Headphones, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { destinations, tours } from "@/data/mockData";
import TourCard from "@/components/tours/TourCard";

const highlights = [
  { icon: Globe, title: "Global Network", desc: "Trusted partners in 50+ destinations worldwide." },
  { icon: ShieldCheck, title: "Verified Operators", desc: "Licensed, transparent, and traveler-first planning." },
  { icon: Plane, title: "Flight & Visa Help", desc: "Guided support from documentation to tickets." },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated experts before, during, and after travel." },
];

const offerings = [
  { icon: Sparkles, title: "Honeymoon Escapes", desc: "Romantic stays curated for couples." },
  { icon: MapPin, title: "Family Holidays", desc: "Comfortable pacing and kid-friendly activities." },
  { icon: Plane, title: "International Packages", desc: "Visa, transfers, and curated experiences." },
  { icon: Globe, title: "Domestic Getaways", desc: "Weekend trips and cultural circuits." },
  { icon: ShieldCheck, title: "Group Tours", desc: "Seamless planning for groups and corporates." },
  { icon: Headphones, title: "Custom Itineraries", desc: "Tailor-made plans built around your style." },
];

export default function Destinations() {
  const international = tours.filter((t) => t.category === "International").slice(0, 6);
  const domestic = tours.filter((t) => t.category === "Domestic").slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Destinations" subtitle="Global journeys and incredible India - handpicked for every traveler." />

      <div className="container mx-auto px-4 py-12 space-y-16">
        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Why Travel With Jayambe Holidays</h2>
              <p className="mt-2 text-muted-foreground">A travel partner focused on experience and reliability.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.title} className="card-surface card-accent p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">What We Offer</h2>
              <p className="mt-2 text-muted-foreground">Packages and services tailored for every journey.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item) => (
              <div key={item.title} className="card-surface card-interactive card-accent p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold text-foreground">Countries We Cover</h2>
          <p className="mt-2 text-muted-foreground">Explore our most loved destinations.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {destinations.map((country) => (
              <span key={country} className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                {country}
              </span>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Global Destinations</h2>
              <p className="mt-2 text-muted-foreground">International tours curated for comfort and discovery.</p>
            </div>
            <Link to="/tours?category=International" className="text-sm text-primary hover:underline">View all international tours</Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {international.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Incredible India</h2>
              <p className="mt-2 text-muted-foreground">Discover the best of India with our domestic tours.</p>
            </div>
            <Link to="/tours?category=Domestic" className="text-sm text-primary hover:underline">View all domestic tours</Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {domestic.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>

        <section className="card-surface card-accent p-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground">Ready to Plan Your Trip?</h2>
          <p className="mt-2 text-muted-foreground">
            Share your preferences and we will craft a custom itinerary within 24 hours.
          </p>
          <Link to="/custom-trip">
            <Button size="lg" className="mt-6 rounded-xl">Plan a Custom Trip</Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
