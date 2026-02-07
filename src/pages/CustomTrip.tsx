import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = ["Destination", "Travelers", "Preferences", "Contact"];

export default function CustomTrip() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ destination: "", month: "", duration: "5", adults: "2", children: "0", budget: "50000", themes: [] as string[], hotelRating: "4", meals: false, flights: false, visa: false, name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0 && !form.destination) e.destination = "Required";
    if (step === 0 && !form.month) e.month = "Required";
    if (step === 3 && !form.name.trim()) e.name = "Required";
    if (step === 3 && !/^\d{10}$/.test(form.phone)) e.phone = "Enter 10-digit number";
    if (step === 3 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) { if (step === 3) { setSubmitted(true); toast({ title: "Trip request submitted!" }); } else setStep(s => s + 1); } };

  if (submitted) return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary"><Check className="h-8 w-8 text-primary-foreground" /></div>
        <h2 className="font-heading text-2xl font-bold text-foreground">Request Submitted!</h2>
        <p className="mt-2 text-muted-foreground">Our travel expert will call you within 24 hours to plan your perfect trip to {form.destination}.</p>
      </motion.div>
    </div>
  );

  const Field = ({ label, name, type = "text", placeholder = "" }: { label: string; name: string; type?: string; placeholder?: string }) => (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
      <input type={type} value={(form as any)[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      {errors[name] && <p className="mt-1 text-xs text-destructive">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-primary py-12"><div className="container mx-auto px-4 text-center"><h1 className="font-heading text-3xl font-bold text-primary-foreground">Plan Your Custom Trip</h1></div></div>
      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* Progress */}
        <div className="mb-8 flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</div>
              <span className="hidden text-sm font-medium text-foreground sm:inline">{s}</span>
              {i < 3 && <div className={`hidden h-0.5 w-8 sm:block ${i < step ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          {step === 0 && <><Field label="Destination" name="destination" placeholder="e.g. Maldives, Bali..." /><Field label="Travel Month" name="month" placeholder="e.g. March 2026" /><Field label="Duration (days)" name="duration" type="number" /></>}
          {step === 1 && <><Field label="Adults" name="adults" type="number" /><Field label="Children" name="children" type="number" /><Field label="Budget per person (₹)" name="budget" type="number" /></>}
          {step === 2 && (
            <div className="space-y-3">
              <Field label="Preferred Hotel Rating" name="hotelRating" />
              {[{ k: "meals", l: "Include Meals" }, { k: "flights", l: "Include Flights" }, { k: "visa", l: "Visa Assistance" }].map(t => (
                <label key={t.k} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" checked={(form as any)[t.k]} onChange={e => setForm({ ...form, [t.k]: e.target.checked })} className="accent-primary" />{t.l}
                </label>
              ))}
            </div>
          )}
          {step === 3 && <><Field label="Full Name" name="name" /><Field label="Phone" name="phone" placeholder="10-digit number" /><Field label="Email" name="email" type="email" /></>}

          <div className="flex gap-3 pt-2">
            {step > 0 && <Button variant="outline" onClick={() => setStep(s => s - 1)} className="rounded-xl">Back</Button>}
            <Button onClick={next} className="flex-1 rounded-xl">{step === 3 ? "Submit Request" : "Next"}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
