import { useState } from "react";
import { LayoutDashboard, Map, CalendarCheck, MessageSquare, Star, Tag, Settings, Menu, X } from "lucide-react";
import { tours, reviews, coupons } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { formatDate, formatINR } from "@/lib/format";

const navItems = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Tours", icon: Map },
  { name: "Bookings", icon: CalendarCheck },
  { name: "Enquiries", icon: MessageSquare },
  { name: "Reviews", icon: Star },
  { name: "Coupons", icon: Tag },
  { name: "Settings", icon: Settings },
];

const stats = [
  { label: "Bookings This Week", value: "47", change: "+12%" },
  { label: "Revenue Estimate", value: formatINR(1840000), change: "+8%" },
  { label: "Top Destination", value: "Maldives", change: "" },
  { label: "Enquiry Conversion", value: "34%", change: "+5%" },
];

const bookings = [
  { id: "AMY-A1B2C", customer: "Rahul Gupta", tour: "Maldives Escape", date: "2026-03-15", status: "Confirmed", amount: 131998 },
  { id: "AMY-D3E4F", customer: "Priya Sharma", tour: "Kerala Backwaters", date: "2026-03-10", status: "Pending", amount: 49998 },
  { id: "AMY-G5H6I", customer: "Amit Kumar", tour: "Rajasthan Heritage", date: "2026-03-20", status: "Confirmed", amount: 65998 },
  { id: "AMY-J7K8L", customer: "Sneha Joshi", tour: "Dubai Experience", date: "2026-04-01", status: "Cancelled", amount: 111998 },
];

const enquiries = [
  { id: "ENQ-1043", name: "Anita Verma", destination: "Bali", date: "2026-02-06", message: "Looking for a 6-day honeymoon plan with villa stay." },
  { id: "ENQ-1044", name: "Rohit Jain", destination: "Kashmir", date: "2026-02-05", message: "Need a family package with senior-friendly itinerary." },
  { id: "ENQ-1045", name: "Meera Kapoor", destination: "Dubai", date: "2026-02-05", message: "Want a short 4-day trip with Burj Khalifa tickets." },
];

export default function Admin() {
  const [active, setActive] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <span className="font-heading text-sm font-bold text-foreground">Admin Dashboard</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X className="h-5 w-5" /></button>
        </div>
        <nav className="space-y-1 p-3">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => { setActive(item.name); setSidebarOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active === item.name ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-4 w-4" />{item.name}
            </button>
          ))}
        </nav>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 min-w-0">
        <header className="flex h-16 items-center gap-3 border-b border-border px-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu className="h-5 w-5" /></button>
          <h1 className="font-heading text-lg font-bold text-foreground">{active}</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl">Export</Button>
            <Button size="sm" className="rounded-xl">New</Button>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {active === "Overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="card-surface p-5">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="mt-1 font-heading text-2xl font-bold text-foreground">{s.value}</p>
                    {s.change && <span className="text-xs text-primary">{s.change}</span>}
                  </div>
                ))}
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="card-surface p-5">
                  <h3 className="mb-4 font-heading text-base font-semibold text-foreground">Recent Bookings</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-xs text-muted-foreground">
                          <th className="pb-2">ID</th>
                          <th className="pb-2">Customer</th>
                          <th className="pb-2">Tour</th>
                          <th className="pb-2">Date</th>
                          <th className="pb-2">Status</th>
                          <th className="pb-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((b) => (
                          <tr key={b.id} className="border-b border-border last:border-0">
                            <td className="py-3 font-mono text-xs text-foreground">{b.id}</td>
                            <td className="py-3 text-foreground">{b.customer}</td>
                            <td className="py-3 text-muted-foreground">{b.tour}</td>
                            <td className="py-3 text-muted-foreground">{formatDate(b.date)}</td>
                            <td className="py-3">
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                b.status === "Confirmed" ? "bg-teal-light text-primary" : b.status === "Pending" ? "bg-gold-light text-accent-foreground" : "bg-muted text-muted-foreground"
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="py-3 font-semibold text-foreground">{formatINR(b.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-surface p-5">
                  <h3 className="mb-4 font-heading text-base font-semibold text-foreground">Top Tours</h3>
                  <div className="space-y-4">
                    {tours.slice(0, 4).map((t) => (
                      <div key={t.id} className="flex items-center gap-3">
                        <img src={t.images[0]} alt={t.title} className="h-12 w-12 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">{t.title}</p>
                          <p className="text-xs text-muted-foreground">{t.destination} | {t.durationDays} days</p>
                        </div>
                        <span className="ml-auto text-xs text-muted-foreground">{formatINR(t.pricePerPerson)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === "Tours" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-heading text-base font-semibold">All Tours ({tours.length})</h3>
                <Button size="sm" className="rounded-xl">Add Tour</Button>
              </div>
              <div className="overflow-x-auto card-surface">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="p-3">Tour</th>
                      <th className="p-3">Destination</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tours.map((t) => (
                      <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="p-3 font-medium text-foreground">{t.title}</td>
                        <td className="p-3 text-muted-foreground">{t.destination}</td>
                        <td className="p-3 text-foreground">{formatINR(t.pricePerPerson)}</td>
                        <td className="p-3 text-foreground">{t.rating}</td>
                        <td className="p-3"><span className="rounded-full bg-teal-light px-2 py-0.5 text-[10px] font-semibold text-primary">Active</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === "Bookings" && (
            <div className="card-surface p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-base font-semibold text-foreground">All Bookings</h3>
                <Button size="sm" variant="outline" className="rounded-xl">Download</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="pb-2">ID</th>
                      <th className="pb-2">Customer</th>
                      <th className="pb-2">Tour</th>
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-b border-border last:border-0">
                        <td className="py-3 font-mono text-xs text-foreground">{b.id}</td>
                        <td className="py-3 text-foreground">{b.customer}</td>
                        <td className="py-3 text-muted-foreground">{b.tour}</td>
                        <td className="py-3 text-muted-foreground">{formatDate(b.date)}</td>
                        <td className="py-3 font-semibold text-foreground">{formatINR(b.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === "Enquiries" && (
            <div className="space-y-4">
              {enquiries.map((e) => (
                <div key={e.id} className="card-surface p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-heading text-sm font-semibold text-foreground">{e.name}</p>
                      <p className="text-xs text-muted-foreground">{e.destination} | {formatDate(e.date)}</p>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-xl">Reply</Button>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{e.message}</p>
                </div>
              ))}
            </div>
          )}

          {active === "Reviews" && (
            <div className="grid gap-4 md:grid-cols-2">
              {reviews.slice(0, 6).map((r) => (
                <div key={r.id} className="card-surface p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {r.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.destination}</p>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground">{formatDate(r.date)}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{r.comment}</p>
                </div>
              ))}
            </div>
          )}

          {active === "Coupons" && (
            <div className="card-surface p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-base font-semibold text-foreground">Coupons</h3>
                <Button size="sm" className="rounded-xl">Create Coupon</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="pb-2">Code</th>
                      <th className="pb-2">Type</th>
                      <th className="pb-2">Discount</th>
                      <th className="pb-2">Min Amount</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((c) => (
                      <tr key={c.code} className="border-b border-border last:border-0">
                        <td className="py-3 font-mono text-xs text-foreground">{c.code}</td>
                        <td className="py-3 text-muted-foreground">{c.type === "percent" ? "Percent" : "Flat"}</td>
                        <td className="py-3 text-foreground">{c.type === "percent" ? `${c.discount}%` : formatINR(c.discount)}</td>
                        <td className="py-3 text-foreground">{formatINR(c.minAmount)}</td>
                        <td className="py-3">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${c.valid ? "bg-teal-light text-primary" : "bg-muted text-muted-foreground"}`}>
                            {c.valid ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === "Settings" && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="card-surface p-5 space-y-4">
                <h3 className="font-heading text-base font-semibold text-foreground">Business Profile</h3>
                {[
                  { label: "Business Name", value: "Jayambe Holidays" },
                  { label: "Support Email", value: "hello@jayambeholidays.com" },
                  { label: "Support Phone", value: "+91 9422880040" },
                ].map((item) => (
                  <div key={item.label}>
                    <label className="text-xs text-muted-foreground">{item.label}</label>
                    <input
                      defaultValue={item.value}
                      className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                ))}
                <Button className="rounded-xl">Save Changes</Button>
              </div>
              <div className="card-surface p-5 space-y-4">
                <h3 className="font-heading text-base font-semibold text-foreground">Operational Settings</h3>
                {[
                  { label: "Auto-confirm bookings", defaultChecked: true },
                  { label: "Enable coupon stacking", defaultChecked: false },
                  { label: "Send daily summary emails", defaultChecked: true },
                ].map((setting) => (
                  <label key={setting.label} className="flex items-center justify-between rounded-xl border border-border p-4 text-sm">
                    <span className="text-foreground">{setting.label}</span>
                    <input type="checkbox" defaultChecked={setting.defaultChecked} className="accent-primary" />
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

