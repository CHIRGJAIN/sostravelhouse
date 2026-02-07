import { Shield, Globe, Heart, Award } from "lucide-react";
import { teamMembers } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/layout/PageHeader";

const milestones = [
  { year: "2005", title: "Founded", desc: "ENGEE HOLIDAYS started as a small travel desk in Delhi." },
  { year: "2010", title: "International Launch", desc: "Expanded to international destinations across 15 countries." },
  { year: "2015", title: "10,000 Travelers", desc: "Reached the milestone of 10,000 happy travelers." },
  { year: "2020", title: "Digital Transformation", desc: "Launched online booking platform and virtual tours." },
  { year: "2025", title: "50,000+ Travelers", desc: "Serving 50,000+ travelers with a 4.7-star rating." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="About ENGEE HOLIDAYS" subtitle="Your trusted partner in travel since 2005." />

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Mission */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground">Our Mission</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">To make world-class travel experiences accessible to every Indian traveler. We believe that every journey should be memorable, every destination should feel like home, and every traveler should return with stories worth sharing.</p>
        </div>

        {/* Values */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[{ icon: Shield, title: "Trust", desc: "Licensed, verified, and transparent." }, { icon: Globe, title: "Global Reach", desc: "50+ destinations worldwide." }, { icon: Heart, title: "Personal Touch", desc: "Every trip is uniquely crafted." }, { icon: Award, title: "Excellence", desc: "4.7-star rated by 50K+ travelers." }].map(v => (
            <div key={v.title} className="card-surface p-6 text-center">
              <v.icon className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div>
          <h2 className="text-center font-heading text-2xl font-bold text-foreground">Our Team</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map(m => (
              <div key={m.name} className="card-surface p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">{m.avatar}</div>
                <h3 className="mt-3 font-heading text-base font-semibold text-foreground">{m.name}</h3>
                <p className="text-xs text-primary">{m.role}</p>
                <p className="mt-2 text-xs text-muted-foreground">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-center font-heading text-2xl font-bold text-foreground">Our Journey</h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-6">
            {milestones.map(m => (
              <div key={m.year} className="flex gap-4">
                <div className="flex flex-col items-center"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{m.year}</div><div className="w-0.5 flex-1 bg-border" /></div>
                <div className="pb-6"><h3 className="font-heading text-base font-semibold text-foreground">{m.title}</h3><p className="mt-1 text-sm text-muted-foreground">{m.desc}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center"><Link to="/contact"><Button size="lg" className="rounded-xl">Get in Touch</Button></Link></div>
      </div>
    </div>
  );
}
