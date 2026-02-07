import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Clock, MapPin, Heart, Download, ChevronLeft, ChevronRight, Users, CalendarDays, Minus, Plus, Check, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { tours, reviews } from "@/data/mockData";
import { useShortlist } from "@/contexts/ShortlistContext";
import TourCard from "@/components/tours/TourCard";
import { useToast } from "@/hooks/use-toast";

export default function TourDetail() {
  const { slug } = useParams();
  const tour = tours.find(t => t.slug === slug);
  const { addItem, removeItem, isInShortlist } = useShortlist();
  const { toast } = useToast();
  const [currentImg, setCurrentImg] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [roomType, setRoomType] = useState("double");
  const [selectedDate] = useState(tour?.nextAvailableDate || "");
  const [showGallery, setShowGallery] = useState(false);

  const tourReviews = useMemo(() => reviews.filter(r => r.tourId === tour?.id), [tour]);
  const similar = useMemo(() => tours.filter(t => t.id !== tour?.id && t.themes.some(th => tour?.themes.includes(th))).slice(0, 3), [tour]);

  if (!tour) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-4xl">😞</p>
          <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">Tour not found</h2>
          <Link to="/tours"><Button className="mt-4 rounded-xl">Browse Tours</Button></Link>
        </div>
      </div>
    );
  }

  const totalPrice = tour.pricePerPerson * (adults + children * 0.7);
  const roomMultiplier = roomType === "single" ? 1.2 : roomType === "triple" ? 0.9 : 1;
  const estimatedTotal = Math.round(totalPrice * roomMultiplier);

  const Counter = ({ label, value, onChange, min = 0 }: { label: string; value: number; onChange: (v: number) => void; min?: number }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <button onClick={() => onChange(Math.max(min, value - 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted" aria-label={`Decrease ${label}`}>
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-6 text-center text-sm font-semibold text-foreground">{value}</span>
        <button onClick={() => onChange(value + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted" aria-label={`Increase ${label}`}>
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* Gallery */}
      <div className="relative">
        <div className="grid grid-cols-1 gap-1 md:grid-cols-4 md:grid-rows-2 md:h-[480px]">
          <div className="relative col-span-2 row-span-2 cursor-pointer overflow-hidden" onClick={() => setShowGallery(true)}>
            <img src={tour.images[0]} alt={tour.title} className="h-full w-full object-cover transition-transform hover:scale-105" />
          </div>
          {tour.images.slice(1, 5).map((img, i) => (
            <div key={i} className={`relative cursor-pointer overflow-hidden ${i >= 2 ? "hidden md:block" : ""}`} onClick={() => { setCurrentImg(i + 1); setShowGallery(true); }}>
              <img src={img} alt="" className="h-full w-full object-cover transition-transform hover:scale-105" loading="lazy" />
            </div>
          ))}
        </div>
        <button onClick={() => setShowGallery(true)} className="absolute bottom-4 right-4 rounded-xl bg-card/90 px-4 py-2 text-sm font-medium text-foreground shadow backdrop-blur-sm hover:bg-card">
          View all photos
        </button>
      </div>

      {/* Full-screen gallery modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90" onClick={() => setShowGallery(false)}>
          <button className="absolute right-4 top-4 text-primary-foreground" onClick={() => setShowGallery(false)} aria-label="Close gallery"><XIcon className="h-6 w-6" /></button>
          <button onClick={e => { e.stopPropagation(); setCurrentImg((currentImg - 1 + tour.images.length) % tour.images.length); }} className="absolute left-4 text-primary-foreground" aria-label="Previous"><ChevronLeft className="h-8 w-8" /></button>
          <img src={tour.images[currentImg]} alt="" className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain" onClick={e => e.stopPropagation()} />
          <button onClick={e => { e.stopPropagation(); setCurrentImg((currentImg + 1) % tour.images.length); }} className="absolute right-4 text-primary-foreground" aria-label="Next"><ChevronRight className="h-8 w-8" /></button>
          <div className="absolute bottom-4 flex gap-2">
            {tour.images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setCurrentImg(i); }}
                className={`h-2 w-2 rounded-full ${i === currentImg ? "bg-primary-foreground" : "bg-primary-foreground/40"}`} aria-label={`Image ${i + 1}`} />
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/tours" className="hover:text-primary">Tours</Link> / <span className="text-foreground">{tour.title}</span>
            </nav>

            {/* Title */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">{tour.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{tour.destination}, {tour.country}</span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground"><Star className="h-4 w-4 fill-accent text-accent" />{tour.rating} ({tour.reviewCount} reviews)</span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{tour.durationDays}D/{tour.durationDays - 1}N</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 rounded-xl"
                  onClick={() => isInShortlist(tour.id) ? removeItem(tour.id) : addItem(tour)}>
                  <Heart className={`h-4 w-4 ${isInShortlist(tour.id) ? "fill-destructive text-destructive" : ""}`} />
                  {isInShortlist(tour.id) ? "Shortlisted" : "Shortlist"}
                </Button>
                <Button variant="outline" size="sm" className="gap-2 rounded-xl"
                  onClick={() => toast({ title: "Download started", description: "Your itinerary PDF is being prepared." })}>
                  <Download className="h-4 w-4" /> Itinerary
                </Button>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-6 flex flex-wrap gap-2">
              {tour.highlights.map(h => (
                <span key={h} className="rounded-full bg-teal-light px-3 py-1 text-xs font-medium text-primary">{h}</span>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="mt-8">
              <TabsList className="flex flex-wrap gap-1 bg-transparent">
                {["overview", "itinerary", "inclusions", "hotels", "reviews", "policies"].map(tab => (
                  <TabsTrigger key={tab} value={tab} className="rounded-xl capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>Experience the magic of {tour.destination} with our carefully crafted {tour.durationDays}-day tour package. This {tour.themes.join(", ")} themed journey takes you through the best of {tour.destination}, offering authentic experiences and premium accommodations.</p>
                <p>Available months: {tour.availableMonths.join(", ")}. Maximum group size: {tour.maxGroupSize} travelers. Next available date: {tour.nextAvailableDate}.</p>
              </TabsContent>

              <TabsContent value="itinerary" className="mt-6">
                <Accordion type="single" collapsible defaultValue="day-0">
                  {tour.itineraryDays.map((day, i) => (
                    <AccordionItem key={i} value={`day-${i}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{day.day}</span>
                          <span className="font-heading text-sm font-semibold text-foreground">{day.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="ml-11 text-sm text-muted-foreground">{day.description}</p>
                        {day.meals.length > 0 && (
                          <p className="ml-11 mt-2 text-xs text-primary font-medium">Meals: {day.meals.join(", ")}</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="inclusions" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-heading text-sm font-semibold text-foreground">Inclusions</h4>
                    <ul className="space-y-2">
                      {tour.inclusions.map(inc => (
                        <li key={inc} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 shrink-0 text-primary" /> {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-heading text-sm font-semibold text-foreground">Exclusions</h4>
                    <ul className="space-y-2">
                      {tour.exclusions.map(exc => (
                        <li key={exc} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <XIcon className="h-4 w-4 shrink-0 text-destructive" /> {exc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hotels" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {tour.hotels.map(h => (
                    <div key={h.name} className="overflow-hidden rounded-xl border border-border bg-card">
                      <img src={h.image} alt={h.name} className="aspect-video w-full object-cover" loading="lazy" />
                      <div className="p-4">
                        <h4 className="font-heading text-sm font-semibold text-foreground">{h.name}</h4>
                        <p className="text-xs text-muted-foreground">{h.location}</p>
                        <div className="mt-1 flex">
                          {Array.from({ length: h.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 space-y-4">
                {tourReviews.length > 0 ? tourReviews.map(r => (
                  <div key={r.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{r.avatar}</div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{r.name}</p>
                        <div className="flex">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-accent text-accent" />)}</div>
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                )) : <p className="text-sm text-muted-foreground">No reviews yet for this tour.</p>}
              </TabsContent>

              <TabsContent value="policies" className="mt-6 space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-heading text-sm font-semibold text-foreground">Cancellation Policy</h4>
                  <p className="mt-1">30+ days: 90% refund | 15-30 days: 50% refund | &lt;15 days: No refund</p>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-foreground">Payment Terms</h4>
                  <p className="mt-1">50% advance at booking. Balance 15 days before departure.</p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Similar Tours */}
            {similar.length > 0 && (
              <div className="mt-12">
                <h3 className="font-heading text-xl font-bold text-foreground">Similar Tours</h3>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {similar.map(t => <TourCard key={t.id} tour={t} />)}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Booking Sidebar */}
          <aside className="hidden w-80 shrink-0 lg:block">
            <div className="sticky top-24 space-y-6 rounded-2xl border border-border bg-card p-6">
              <div>
                {tour.dealPercent > 0 && (
                  <span className="text-sm text-muted-foreground line-through">₹{Math.round(tour.pricePerPerson / (1 - tour.dealPercent / 100)).toLocaleString()}</span>
                )}
                <p className="text-2xl font-bold text-foreground">
                  ₹{tour.pricePerPerson.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground">/person</span>
                </p>
              </div>

              <div className="space-y-1 rounded-xl bg-muted p-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>Next: {selectedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{adults + children + infants} travelers</span>
                </div>
              </div>

              <div className="space-y-3">
                <Counter label="Adults" value={adults} onChange={setAdults} min={1} />
                <Counter label="Children (5-12)" value={children} onChange={setChildren} />
                <Counter label="Infants (0-4)" value={infants} onChange={setInfants} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Room Type</label>
                <select value={roomType} onChange={e => setRoomType(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" aria-label="Room type">
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="triple">Triple</option>
                </select>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{estimatedTotal.toLocaleString()}</span>
                </div>
                <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                  <span>Taxes & fees</span>
                  <span>₹{Math.round(estimatedTotal * 0.05).toLocaleString()}</span>
                </div>
                <div className="mt-2 flex justify-between font-heading text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span>₹{Math.round(estimatedTotal * 1.05).toLocaleString()}</span>
                </div>
              </div>

              <Link to="/booking" className="block">
                <Button className="w-full rounded-xl text-base" size="lg">Book Now</Button>
              </Link>
              <Button variant="outline" className="w-full rounded-xl" onClick={() => isInShortlist(tour.id) ? removeItem(tour.id) : addItem(tour)}>
                <Heart className={`mr-2 h-4 w-4 ${isInShortlist(tour.id) ? "fill-destructive text-destructive" : ""}`} />
                {isInShortlist(tour.id) ? "Remove from Shortlist" : "Add to Shortlist"}
              </Button>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Sticky Bottom */}
      <div className="fixed bottom-14 left-0 right-0 z-40 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-foreground">₹{estimatedTotal.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{adults + children} travelers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl"
              onClick={() => isInShortlist(tour.id) ? removeItem(tour.id) : addItem(tour)}>
              <Heart className={`h-4 w-4 ${isInShortlist(tour.id) ? "fill-destructive text-destructive" : ""}`} />
            </Button>
            <Link to="/booking">
              <Button size="sm" className="rounded-xl">Book Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
