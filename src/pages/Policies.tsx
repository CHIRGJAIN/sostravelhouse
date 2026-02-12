import PageHeader from "@/components/layout/PageHeader";

export default function Policies() {
  const sections = [
    { id: "cancellation", title: "Cancellation Policy", content: "Cancellations made 30+ days before departure: 90% refund. 15-30 days before departure: 50% refund. Less than 15 days before departure: No refund. All cancellations must be communicated in writing via email to hello@ammayatra.com. Processing of refunds takes 7-10 business days." },
    { id: "terms", title: "Terms & Conditions", content: "By booking with Amma Yatra, you agree to our terms. All tour prices are per person on twin sharing basis unless stated otherwise. Prices are subject to change without prior notice due to currency fluctuations, fuel surcharges, or government taxes. Valid passport and necessary visas are the responsibility of the traveler. Amma Yatra reserves the right to alter itineraries due to unforeseen circumstances." },
    { id: "privacy", title: "Privacy Policy", content: "We collect personal information solely for booking and communication purposes. Your data is encrypted and never shared with third parties without consent. We use cookies to improve your browsing experience. You can request deletion of your data at any time by contacting us." },
    { id: "refund", title: "Refund Policy", content: "Refunds are processed within 7-10 business days of approval. Refunds for credit card payments will be credited to the original card. Bank transfer refunds may take an additional 3-5 business days. Partial refunds may apply based on services already utilized. Travel insurance claims are processed separately through the insurance provider." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Policies" subtitle="Clear terms so you can book with confidence." />
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <nav className="mb-8 flex flex-wrap gap-2">
          {sections.map(s => <a key={s.id} href={`#${s.id}`} className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">{s.title}</a>)}
        </nav>
        <div className="space-y-10">
          {sections.map(s => (
            <section key={s.id} id={s.id}>
              <h2 className="font-heading text-xl font-bold text-foreground">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

