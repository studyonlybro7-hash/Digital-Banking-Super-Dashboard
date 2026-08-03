import React, { useState } from "react";
import {
  LayoutGrid, ArrowLeftRight, CreditCard, Landmark, TrendingUp, Settings,
  Eye, EyeOff, ShieldCheck, ArrowUpRight, ArrowDownLeft, Send, Plus,
  Snowflake, Search, Bell, ChevronRight, Wifi
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, Tooltip
} from "recharts";

const nav = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "payments", label: "Payments", icon: ArrowLeftRight },
  { id: "cards", label: "Cards", icon: CreditCard },
  { id: "loans", label: "Loans", icon: Landmark },
  { id: "invest", label: "Invest", icon: TrendingUp },
  { id: "settings", label: "Settings", icon: Settings },
];

const spend = [
  { m: "Feb", v: 2100 }, { m: "Mar", v: 3400 }, { m: "Apr", v: 2800 },
  { m: "May", v: 4200 }, { m: "Jun", v: 3100 }, { m: "Jul", v: 3900 },
];

const txns = [
  { id: 1, name: "Nordstrom", cat: "Shopping", amt: -184.5, time: "Today, 10:42" },
  { id: 2, name: "Payroll · Vantage Corp", cat: "Income", amt: 4820.0, time: "Today, 08:00" },
  { id: 3, name: "Blue Bottle Coffee", cat: "Dining", amt: -6.75, time: "Yesterday" },
  { id: 4, name: "Transfer to J. Reyes", cat: "Transfer", amt: -300.0, time: "Yesterday" },
  { id: 5, name: "Pacific Gas & Electric", cat: "Utilities", amt: -142.11, time: "Aug 1" },
  { id: 6, name: "Dividend · VTI", cat: "Investing", amt: 38.62, time: "Jul 30" },
];

const cards = [
  { id: 1, label: "Meridian Signature", last4: "4471", grad: "from-[#20293A] to-[#0B0F14]", ring: "border-[#C9A24D]/40" },
  { id: 2, label: "Meridian Everyday", last4: "9902", grad: "from-[#2B1E33] to-[#0B0F14]", ring: "border-[#8A93A3]/30" },
];

const holdings = [
  { t: "VTI", n: "Total Market ETF", v: 18420.33, pct: 2.4 },
  { t: "AAPL", n: "Apple Inc.", v: 6210.0, pct: -0.8 },
  { t: "BTC", n: "Bitcoin", v: 4103.87, pct: 5.1 },
];

export default function App() {
  const [active, setActive] = useState("overview");
  const [hidden, setHidden] = useState(false);
  const [frozen, setFrozen] = useState({});

  const balance = 24318.92;
  const balanceStr = hidden ? "••••••" : balance.toLocaleString("en-US", { minimumFractionDigits: 2 });

  const toggleFreeze = (id) => setFrozen((f) => ({ ...f, [id]: !f[id] }));

  return (
    <div className="font-body min-h-screen w-full bg-[#0B0F14] text-[#EDEEF0] flex">
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-[#232C38] p-5">
        <div className="flex items-center gap-2 mb-10 px-1">
          <div className="w-8 h-8 rounded-md bg-[#C9A24D] flex items-center justify-center">
            <span className="font-display text-[#0B0F14] font-bold text-sm">M</span>
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">Meridian</span>
        </div>
        <nav className="flex flex-col gap-1">
          {nav.map((n) => {
            const Icon = n.icon;
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setActive(n.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-[#1B2430] text-[#EDEEF0]" : "text-[#8A93A3] hover:text-[#EDEEF0] hover:bg-[#131A24]"
                }`}
              >
                <Icon size={17} strokeWidth={2} />
                <span>{n.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="mt-auto rounded-xl border border-[#232C38] p-4 bg-[#131A24]">
          <div className="flex items-center gap-2 text-[#34D399] text-xs font-medium mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] pulse-dot" />
            Session secured
          </div>
          <p className="text-[11px] text-[#8A93A3] leading-relaxed">256-bit encrypted · device verified</p>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-5 md:p-8 space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[#8A93A3] text-sm">Good evening, Alex</p>
            <h1 className="font-display text-xl font-semibold">Overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[#131A24] border border-[#232C38] rounded-lg px-3 py-2 text-sm text-[#8A93A3]">
              <Search size={15} />
              <span>Search transactions</span>
            </div>
            <button className="w-9 h-9 rounded-lg border border-[#232C38] flex items-center justify-center text-[#8A93A3] hover:text-[#EDEEF0]">
              <Bell size={16} />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#C9A24D] flex items-center justify-center font-display font-semibold text-[#0B0F14] text-sm">
              A
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl border border-[#232C38] bg-gradient-to-br from-[#131A24] to-[#0E141C] p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#8A93A3] text-xs mb-2">
                  <ShieldCheck size={14} className="text-[#C9A24D]" />
                  Meridian Checking · {hidden ? "•••• 8823" : "8823"}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-num text-4xl md:text-5xl font-semibold tracking-tight">
                    ${balanceStr}
                  </span>
                  <button
                    onClick={() => setHidden((h) => !h)}
                    className="text-[#8A93A3] hover:text-[#EDEEF0] transition-colors"
                  >
                    {hidden ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-[#34D399] text-sm mt-2 font-num">+2.3% this month</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-6">
              {[
                { icon: Send, label: "Send" },
                { icon: ArrowDownLeft, label: "Request" },
                { icon: Plus, label: "Top up" },
                { icon: Snowflake, label: "Freeze" },
              ].map((a) => (
                <button
                  key={a.label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-[#232C38] bg-[#131A24] py-3 hover:border-[#C9A24D]/50 transition-colors"
                >
                  <a.icon size={17} className="text-[#C9A24D]" />
                  <span className="text-xs text-[#8A93A3]">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#232C38] bg-[#131A24] p-6 flex flex-col">
            <p className="text-sm text-[#8A93A3] mb-1">Spending trend</p>
            <p className="font-num text-2xl font-semibold mb-4">$3,900</p>
            <div className="flex-1 -mx-2">
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={spend}>
                  <defs>
                    <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C9A24D" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#C9A24D" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="m" tick={{ fill: "#8A93A3", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#1B2430", border: "1px solid #232C38", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "#8A93A3" }}
                  />
                  <Area type="monotone" dataKey="v" stroke="#C9A24D" strokeWidth={2} fill="url(#spendFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl border border-[#232C38] bg-[#131A24] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold">Recent activity</h2>
              <button className="text-[#8A93A3] text-sm flex items-center gap-1 hover:text-[#EDEEF0]">
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-1">
              {txns.map((t) => (
                <div key={t.id} className="flex items-center justify-between py-3 border-b border-[#1E2632] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${t.amt > 0 ? "bg-[#34D399]/10" : "bg-[#1B2430]"}`}>
                      {t.amt > 0 ? <ArrowDownLeft size={15} className="text-[#34D399]" /> : <ArrowUpRight size={15} className="text-[#8A93A3]" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-[#8A93A3]">{t.cat} · {t.time}</p>
                    </div>
                  </div>
                  <span className={`font-num text-sm font-medium ${t.amt > 0 ? "text-[#34D399]" : "text-[#EDEEF0]"}`}>
                    {hidden ? "••••" : `${t.amt > 0 ? "+" : "-"}$${Math.abs(t.amt).toFixed(2)}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#232C38] bg-[#131A24] p-6">
            <h2 className="font-display font-semibold mb-4">Loan payoff</h2>
            <p className="text-xs text-[#8A93A3] mb-1">Auto loan · Meridian Financing</p>
            <p className="font-num text-2xl font-semibold mb-3">$8,240 <span className="text-sm text-[#8A93A3] font-body">left of $22,000</span></p>
            <div className="w-full h-2 rounded-full bg-[#1E2632] overflow-hidden mb-2">
              <div className="h-full bg-[#C9A24D] rounded-full" style={{ width: "63%" }} />
            </div>
            <p className="text-xs text-[#8A93A3]">63% paid · 14 payments remaining</p>

            <div className="mt-6 pt-6 border-t border-[#1E2632]">
              <h3 className="font-display font-semibold mb-3 text-sm">Portfolio</h3>
              <div className="space-y-3">
                {holdings.map((h) => (
                  <div key={h.t} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{h.t}</p>
                      <p className="text-xs text-[#8A93A3]">{h.n}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-num text-sm">{hidden ? "••••" : `$${h.v.toLocaleString()}`}</p>
                      <p className={`text-xs font-num ${h.pct >= 0 ? "text-[#34D399]" : "text-[#F1653A]"}`}>
                        {h.pct >= 0 ? "+" : ""}{h.pct}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#232C38] bg-[#131A24] p-6">
          <h2 className="font-display font-semibold mb-4">Your cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cards.map((c) => {
              const isFrozen = frozen[c.id];
              return (
                <div key={c.id} className={`rounded-2xl p-5 bg-gradient-to-br ${c.grad} border ${c.ring} relative overflow-hidden`}>
                  {isFrozen && (
                    <div className="absolute inset-0 bg-[#0B0F14]/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                      <span className="flex items-center gap-2 text-sm font-medium text-[#8A93A3]">
                        <Snowflake size={15} /> Frozen
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-medium">{c.label}</span>
                    <Wifi size={16} className="rotate-90 text-[#8A93A3]" />
                  </div>
                  <p className="font-num text-lg tracking-widest mb-4">•••• •••• •••• {hidden ? "••••" : c.last4}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#8A93A3]">Alex Rivera</span>
                    <button
                      onClick={() => toggleFreeze(c.id)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-[#3A4452] hover:border-[#C9A24D]/60 transition-colors relative z-20"
                    >
                      {isFrozen ? "Unfreeze" : "Freeze"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
