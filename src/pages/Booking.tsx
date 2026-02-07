import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, CreditCard, Smartphone, Building } from "lucide-react";
import { motion } from "framer-motion";

const bookingSteps = ["Traveler Info", "Add-ons", "Review & Pay"];

export default function Booking() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [traveler, setTraveler] = useState({ name: "", email: "", phone: "", passport: "" });
  const [addons, setAddons] = useState({ insurance: false, pickup: false, meals: false });
  const [payMethod, setPayMethod] = useState("card");
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const bookingId = `ENG-${Date.now().toString(36).toUpperCase()}`;

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!traveler.name.trim()) e.name = "Required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(traveler.email)) e.email = "Invalid email";
      if (!/^\d{10}$/.test(traveler.phone)) e.phone = "10-digit number";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); toast({ title: "Booking confirmed!" }); }, 2000);
  };

  if (done) return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary"><Check className="h-8 w-8 text-primary-foreground" /></div>
        <h2 className="font-heading text-2xl font-bold text-foreground">Booking Confirmed!</h2>
        <p className="mt-2 text-lg font-semibold text-primary">Booking ID: {bookingId}</p>
        <p className="mt-2 text-sm text-muted-foreground">Confirmation sent to {traveler.email}</p>
        <Button onClick={() => toast({ title: "Receipt downloading..." })} variant="outline" className="mt-4 rounded-xl">Download Receipt</Button>
      </motion.div>
    </div>
  );

  const Field = ({ label, name, type = "text" }: { label: string; name: string; type?: string }) => (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
      <input type={type} value={(traveler as any)[name]} onChange={e => setTraveler({ ...traveler, [name]: e.target.value })}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      {errors[name] && <p className="mt-1 text-xs text-destructive">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-primary py-12"><div className="container mx-auto px-4 text-center"><h1 className="font-heading text-3xl font-bold text-primary-foreground">Complete Your Booking</h1></div></div>
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8 flex gap-2">
          {bookingSteps.map((s, i) => (
            <div key={s} className={`flex-1 rounded-full py-2 text-center text-xs font-medium ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          {step === 0 && <><Field label="Full Name" name="name" /><Field label="Email" name="email" type="email" /><Field label="Phone" name="phone" /><Field label="Passport No. (optional)" name="passport" /></>}
          {step === 1 && (
            <div className="space-y-3">
              <h3 className="font-heading text-lg font-semibold text-foreground">Add-ons</h3>
              {[{ k: "insurance", l: "Travel Insurance", p: "₹999/person" }, { k: "pickup", l: "Airport Pickup", p: "₹1,500" }, { k: "meals", l: "Meal Upgrade", p: "₹2,000/person" }].map(a => (
                <label key={a.k} className="flex items-center justify-between rounded-xl border border-border p-4 cursor-pointer hover:bg-muted">
                  <div className="flex items-center gap-3"><input type="checkbox" checked={(addons as any)[a.k]} onChange={e => setAddons({ ...addons, [a.k]: e.target.checked })} className="accent-primary" /><span className="text-sm font-medium text-foreground">{a.l}</span></div>
                  <span className="text-sm text-muted-foreground">{a.p}</span>
                </label>
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold text-foreground">Payment Method</h3>
              {[{ k: "card", l: "Credit/Debit Card", icon: CreditCard }, { k: "upi", l: "UPI", icon: Smartphone }, { k: "netbanking", l: "Net Banking", icon: Building }].map(m => (
                <label key={m.k} className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer ${payMethod === m.k ? "border-primary bg-teal-light" : "border-border"}`}>
                  <input type="radio" name="pay" checked={payMethod === m.k} onChange={() => setPayMethod(m.k)} className="accent-primary" />
                  <m.icon className="h-5 w-5 text-foreground" /><span className="text-sm font-medium text-foreground">{m.l}</span>
                </label>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && <Button variant="outline" onClick={() => setStep(s => s - 1)} className="rounded-xl">Back</Button>}
            {step < 2 ? <Button onClick={() => { if (validate()) setStep(s => s + 1); }} className="flex-1 rounded-xl">Next</Button>
              : <Button onClick={handlePay} disabled={loading} className="flex-1 rounded-xl">{loading ? "Processing..." : "Pay Now"}</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}
