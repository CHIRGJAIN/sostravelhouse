import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const quickLinks = [
  { name: "Destinations", path: "/destinations" },
  { name: "Domestic Tours", path: "/tours?category=Domestic" },
  { name: "International Tours", path: "/tours?category=International" },
  { name: "Honeymoon Packages", path: "/tours?theme=Honeymoon" },
  { name: "Custom Trip Planner", path: "/custom-trip" },
  { name: "Blog", path: "/blog" },
];

const supportLinks = [
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Cancellation Policy", path: "/policies" },
  { name: "Terms & Conditions", path: "/policies" },
  { name: "Privacy Policy", path: "/policies" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-foreground">Jayambe Holidays</p>
                <p className="text-[10px] font-medium uppercase tracking-widest text-primary">Premium Tours</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your trusted tour operator based in Chennai, India. Creating unforgettable travel experiences since 2005.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={item.name}
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-foreground">Explore</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-foreground">Support</h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-foreground">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">123 Jayambe Holidays Avenue, T. Nagar, Chennai, Tamil Nadu 600017</span>
              </li>
              <li>
                <a href="tel:9000000000" className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  +91 9000000000
                </a>
              </li>
              <li>
                <a href="mailto:hello@jayambeholidays.com" className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  hello@jayambeholidays.com
                </a>
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1">Verified</span>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-green-700">Active</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            (c) 2026 Jayambe Holidays. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

