import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/layout/PageHeader";

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", callbackTime: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (form.phone && !/^\d{10}$/.test(form.phone)) e.phone = "10-digit number";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) { setSubmitted(true); toast({ title: "Message sent!", description: "We will get back to you soon." }); }
  };

  const Field = ({ label, name, type = "text", textarea = false }: { label: string; name: string; type?: string; textarea?: boolean }) => (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
      {textarea ? (
        <textarea
          value={(form as any)[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          rows={4}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      ) : (
        <input
          type={type}
          value={(form as any)[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      )}
      {errors[name] && <p className="mt-1 text-xs text-destructive">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Contact Us" subtitle="Reach out and we will get back to you within 24 hours." />
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-foreground">Get in Touch</h2>
            {[
              { icon: MapPin, label: "Office", value: "Delhi, India" },
              { icon: Phone, label: "Phone", value: "+91 9811622000", href: "tel:9811622000" },
              { icon: Mail, label: "Email", value: "vineet@engeeholidays.com", href: "mailto:vineet@engeeholidays.com" },
              { icon: Clock, label: "Hours", value: "Mon-Sat: 9AM - 7PM IST" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <item.icon className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-primary hover:underline">{item.value}</a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="card-surface p-6">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <Mail className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-foreground">Message Sent!</h3>
                <p className="mt-2 text-muted-foreground">We will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Field label="Name" name="name" />
                <Field label="Email" name="email" type="email" />
                <Field label="Phone (optional)" name="phone" />
                <Field label="Message" name="message" textarea />
                <Field label="Preferred Callback Time (optional)" name="callbackTime" />
                <Button type="submit" className="w-full rounded-xl" size="lg">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
