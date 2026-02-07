import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().trim().email("Please enter a valid email");

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError("");
    setSubmitted(true);
    toast({ title: "Subscribed!", description: "You'll receive our best travel deals." });
  };

  return (
    <section className="py-16 md:py-24" aria-labelledby="newsletter-heading">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-xl rounded-2xl gradient-primary p-8 text-center md:p-12">
          <h2 id="newsletter-heading" className="font-heading text-2xl font-bold text-primary-foreground md:text-3xl">
            Get Exclusive Travel Deals
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Subscribe and save up to 25% on your next booking
          </p>

          {submitted ? (
            <div className="mt-6 rounded-xl bg-card/20 p-4">
              <p className="text-sm font-medium text-primary-foreground">You are subscribed. Check your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl bg-card/20 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 border border-card/10 focus:outline-none focus:ring-2 focus:ring-card/30"
                  aria-label="Email address"
                />
                <Button type="submit" size="lg" className="rounded-xl bg-card text-primary hover:bg-card/90" aria-label="Subscribe">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {error && <p className="mt-2 text-xs text-accent" role="alert">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
