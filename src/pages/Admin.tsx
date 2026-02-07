import { useState } from "react";
import { LayoutDashboard, Map, CalendarCheck, MessageSquare, Star, Tag, Settings, Menu, X } from "lucide-react";
import { tours } from "@/data/mockData";
import { Button } from "@/components/ui/button";

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
  { label: "Revenue Estimate", value: "₹18.4L", change: "+8%" },
  { label: "Top Destination", value: "Maldives", change: "" },
  { label: "Enquiry Conversion", value: "34%", change: "+5%" },
];

const bookings = [
  { id: "ENG-A1B2C", customer: "Rahul Gupta", tour: "Maldives Escape", date: "2026-03-15", status: "Confirmed", amount: "₹1,31,998" },
  { id: "ENG-D3E4F", customer: "Priya Sharma", tour: "Kerala Backwaters", date: "2026-03-10", status: "Pending", amount: "₹49,998" },
  { id: "ENG-G5H6I", customer: "Amit Kumar", tour: "Rajasthan Heritage", date: "2026-03-20", status: "Confirmed", amount: "₹65,998" },
  { id: "ENG-J7K8L", customer: "Sneha Joshi", tour: "Dubai Experience", date: "2026-04-01", status: "Cancelled", amount: "₹1,11,998" },
];

export default function Admin() {
  const [active, setActive] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 border-r border-border bg-card transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <span className="font-heading text-sm font-bold text-foreground">Admin Panel</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X className="h-5 w-5" /></button>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map(item => (
            <button key={item.name} onClick={() => { setActive(item.name); setSidebarOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active === item.name ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
              <item.icon className="h-4 w-4" />{item.name}
            </button>
          ))}
        </nav>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="flex h-16 items-center gap-3 border-b border-border px-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu className="h-5 w-5" /></button>
          <h1 className="font-heading text-lg font-bold text-foreground">{active}</h1>
          <span className="ml-auto rounded bg-accent/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-accent-foreground">DEMO</span>
        </header>

        <div className="p-4 md:p-6">
          {active === "Overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map(s => (
                  <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="mt-1 font-heading text-2xl font-bold text-foreground">{s.value}</p>
                    {s.change && <span className="text-xs text-primary">{s.change}</span>}
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-heading text-base font-semibold text-foreground mb-4">Recent Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border text-left text-xs text-muted-foreground"><th className="pb-2">ID</th><th className="pb-2">Customer</th><th className="pb-2">Tour</th><th className="pb-2">Date</th><th className="pb-2">Status</th><th className="pb-2">Amount</th></tr></thead>
                    <tbody>{bookings.map(b => (
                      <tr key={b.id} className="border-b border-border last:border-0">
                        <td className="py-3 font-mono text-xs text-foreground">{b.id}</td>
                        <td className="py-3 text-foreground">{b.customer}</td>
                        <td className="py-3 text-muted-foreground">{b.tour}</td>
                        <td className="py-3 text-muted-foreground">{b.date}</td>
                        <td className="py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${b.status === "Confirmed" ? "bg-teal-light text-primary" : b.status === "Pending" ? "bg-gold-light text-accent-foreground" : "bg-muted text-muted-foreground"}`}>{b.status}</span></td>
                        <td className="py-3 font-semibold text-foreground">{b.amount}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {active === "Tours" && (
            <div className="space-y-4">
              <div className="flex justify-between"><h3 className="font-heading text-base font-semibold">All Tours ({tours.length})</h3><Button size="sm" className="rounded-xl">+ Add Tour</Button></div>
              <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border text-left text-xs text-muted-foreground"><th className="p-3">Tour</th><th className="p-3">Destination</th><th className="p-3">Price</th><th className="p-3">Rating</th><th className="p-3">Status</th></tr></thead>
                  <tbody>{tours.map(t => (
                    <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium text-foreground">{t.title}</td>
                      <td className="p-3 text-muted-foreground">{t.destination}</td>
                      <td className="p-3 text-foreground">₹{t.pricePerPerson.toLocaleString()}</td>
                      <td className="p-3 text-foreground">{t.rating}</td>
                      <td className="p-3"><span className="rounded-full bg-teal-light px-2 py-0.5 text-[10px] font-semibold text-primary">Active</span></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}
          {!["Overview", "Tours"].includes(active) && (
            <div className="flex min-h-[40vh] items-center justify-center"><div className="text-center"><p className="text-4xl">🚧</p><h3 className="mt-4 font-heading text-xl font-semibold text-foreground">{active}</h3><p className="mt-2 text-sm text-muted-foreground">This section is available in the full version.</p></div></div>
          )}
        </div>
      </div>
    </div>
  );
}
