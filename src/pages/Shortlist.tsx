import { Link } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShortlist } from "@/contexts/ShortlistContext";
import { useState } from "react";
import { coupons } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Shortlist() {
  const { items, removeItem, updateItem, clearAll, totalEstimate } = useShortlist();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<typeof coupons[0] | null>(null);

  const applyCoupon = () => {
    const c = coupons.find(cp => cp.code === couponCode.toUpperCase() && cp.valid);
    if (c) { setAppliedCoupon(c); toast({ title: "Coupon applied!", description: c.description }); }
    else toast({ title: "Invalid coupon", variant: "destructive" });
  };

  const discount = appliedCoupon ? (appliedCoupon.type === "percent" ? totalEstimate * appliedCoupon.discount / 100 : appliedCoupon.discount) : 0;

  if (items.length === 0) return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center"><p className="text-4xl">❤️</p><h2 className="mt-4 font-heading text-2xl font-bold text-foreground">Your shortlist is empty</h2><p className="mt-2 text-muted-foreground">Browse tours and add your favorites</p><Link to="/tours"><Button className="mt-4 rounded-xl">Explore Tours</Button></Link></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <div className="gradient-primary py-12"><div className="container mx-auto px-4 text-center"><h1 className="font-heading text-3xl font-bold text-primary-foreground">Your Shortlist ({items.length})</h1></div></div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            {items.map(item => (
              <div key={item.tour.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                <Link to={`/tours/${item.tour.slug}`}><img src={item.tour.images[0]} alt={item.tour.title} className="h-24 w-32 rounded-xl object-cover" /></Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/tours/${item.tour.slug}`} className="font-heading text-base font-semibold text-foreground hover:text-primary">{item.tour.title}</Link>
                  <p className="text-xs text-muted-foreground">{item.tour.destination} · {item.tour.durationDays}D</p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateItem(item.tour.id, { adults: Math.max(1, item.adults - 1) })} className="h-6 w-6 rounded border border-border flex items-center justify-center"><Minus className="h-3 w-3" /></button>
                      <span className="text-xs">{item.adults}A</span>
                      <button onClick={() => updateItem(item.tour.id, { adults: item.adults + 1 })} className="h-6 w-6 rounded border border-border flex items-center justify-center"><Plus className="h-3 w-3" /></button>
                    </div>
                    <span className="text-sm font-semibold text-foreground">₹{(item.tour.pricePerPerson * item.adults).toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={() => removeItem(item.tour.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            <Button variant="ghost" onClick={clearAll} className="text-xs text-destructive">Clear All</Button>
          </div>

          <aside className="hidden w-80 shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 space-y-4">
              <h3 className="font-heading text-lg font-semibold text-foreground">Summary</h3>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₹{totalEstimate.toLocaleString()}</span></div>
              {appliedCoupon && <div className="flex justify-between text-sm"><span className="text-primary">Discount ({appliedCoupon.code})</span><span className="text-primary">-₹{discount.toLocaleString()}</span></div>}
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Taxes (5%)</span><span className="text-foreground">₹{Math.round((totalEstimate - discount) * 0.05).toLocaleString()}</span></div>
              <div className="border-t pt-2 flex justify-between font-heading text-lg font-bold"><span>Total</span><span>₹{Math.round((totalEstimate - discount) * 1.05).toLocaleString()}</span></div>
              <div className="flex gap-2">
                <input value={couponCode} onChange={e => setCouponCode(e.target.value)} placeholder="Coupon code" className="flex-1 rounded-xl border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <Button onClick={applyCoupon} variant="outline" size="sm" className="rounded-xl">Apply</Button>
              </div>
              <Link to="/booking" className="block"><Button className="w-full rounded-xl" size="lg">Proceed to Booking</Button></Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
