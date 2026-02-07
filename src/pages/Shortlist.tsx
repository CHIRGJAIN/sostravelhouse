import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShortlist } from "@/contexts/ShortlistContext";
import { useState } from "react";
import { coupons } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/layout/PageHeader";
import { formatINR } from "@/lib/format";

export default function Shortlist() {
  const { items, removeItem, updateItem, clearAll, totalEstimate } = useShortlist();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<typeof coupons[0] | null>(null);

  const applyCoupon = () => {
    const c = coupons.find((cp) => cp.code === couponCode.toUpperCase() && cp.valid);
    if (c) { setAppliedCoupon(c); toast({ title: "Coupon applied!", description: c.description }); }
    else toast({ title: "Invalid coupon", variant: "destructive" });
  };

  const discount = appliedCoupon
    ? (appliedCoupon.type === "percent" ? totalEstimate * appliedCoupon.discount / 100 : appliedCoupon.discount)
    : 0;
  const taxes = Math.round((totalEstimate - discount) * 0.05);
  const grandTotal = Math.round((totalEstimate - discount) * 1.05);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Your Shortlist" subtitle="Save tours you want to review later." />
        <div className="container mx-auto px-4 py-12">
          <div className="card-surface p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Heart className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">Your shortlist is empty</h2>
            <p className="mt-2 text-muted-foreground">Browse tours and add your favorites.</p>
            <Link to="/tours"><Button className="mt-6 rounded-xl">Explore Tours</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <PageHeader
        title={`Your Shortlist (${items.length})`}
        subtitle="Review your selected tours and proceed to booking."
      />
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div key={item.tour.id} className="flex flex-col gap-4 card-surface p-4 sm:flex-row">
                <Link to={`/tours/${item.tour.slug}`} className="shrink-0">
                  <img src={item.tour.images[0]} alt={item.tour.title} className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-32" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/tours/${item.tour.slug}`} className="font-heading text-base font-semibold text-foreground hover:text-primary">
                    {item.tour.title}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.tour.destination} | {item.tour.durationDays} days
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateItem(item.tour.id, { adults: Math.max(1, item.adults - 1) })}
                        className="h-7 w-7 rounded border border-border flex items-center justify-center hover:bg-muted"
                        aria-label="Decrease adults"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs">Adults: {item.adults}</span>
                      <button
                        onClick={() => updateItem(item.tour.id, { adults: item.adults + 1 })}
                        className="h-7 w-7 rounded border border-border flex items-center justify-center hover:bg-muted"
                        aria-label="Increase adults"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{formatINR(item.tour.pricePerPerson * item.adults)}</span>
                  </div>
                </div>
                <button onClick={() => removeItem(item.tour.id)} className="self-start text-muted-foreground hover:text-destructive" aria-label="Remove">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={clearAll} className="text-xs text-destructive">Clear All</Button>
              <Link to="/tours" className="text-xs text-primary hover:underline">Add more tours</Link>
            </div>

            <div className="lg:hidden">
              <SummaryCard
                subtotal={totalEstimate}
                discount={discount}
                taxes={taxes}
                total={grandTotal}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                applyCoupon={applyCoupon}
                appliedCoupon={appliedCoupon?.code}
              />
              <Link to="/booking" className="mt-4 block">
                <Button className="w-full rounded-xl" size="lg">Proceed to Booking</Button>
              </Link>
            </div>
          </div>

          <aside className="hidden w-80 shrink-0 lg:block">
            <div className="sticky top-24 space-y-4 card-surface p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground">Summary</h3>
              <SummaryCard
                subtotal={totalEstimate}
                discount={discount}
                taxes={taxes}
                total={grandTotal}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                applyCoupon={applyCoupon}
                appliedCoupon={appliedCoupon?.code}
              />
              <Link to="/booking" className="block">
                <Button className="w-full rounded-xl" size="lg">Proceed to Booking</Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  subtotal,
  discount,
  taxes,
  total,
  couponCode,
  setCouponCode,
  applyCoupon,
  appliedCoupon,
}: {
  subtotal: number;
  discount: number;
  taxes: number;
  total: number;
  couponCode: string;
  setCouponCode: (value: string) => void;
  applyCoupon: () => void;
  appliedCoupon?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="text-foreground">{formatINR(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-primary">Discount ({appliedCoupon})</span>
          <span className="text-primary">-{formatINR(discount)}</span>
        </div>
      )}
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Taxes (5%)</span>
        <span className="text-foreground">{formatINR(taxes)}</span>
      </div>
      <div className="border-t pt-2 flex justify-between font-heading text-lg font-bold">
        <span>Total</span>
        <span>{formatINR(total)}</span>
      </div>
      <div className="flex gap-2">
        <input
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon code"
          className="flex-1 rounded-xl border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <Button onClick={applyCoupon} variant="outline" size="sm" className="rounded-xl">Apply</Button>
      </div>
    </div>
  );
}
