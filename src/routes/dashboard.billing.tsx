import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/dashboard/billing")({
  head: () => ({ meta: [{ title: "Billing — InterestBoost" }] }),
  component: Billing,
});

function Billing() {
  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold">Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your subscription and invoices.</p>
      </div>

      <div className="rounded-2xl glass p-6 ring-1 ring-primary/40">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-accent">Current plan</div>
            <div className="mt-1 font-display text-2xl font-semibold">Pro Trial</div>
            <div className="mt-1 text-sm text-muted-foreground">Ends June 13, 2026 · $49/mo after trial</div>
          </div>
          <button className="h-10 px-5 rounded-lg bg-gradient-to-r from-primary to-secondary text-sm font-medium text-primary-foreground">Upgrade to Pro</button>
        </div>
        <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-sm">
          {["50,000 listings tracked", "15-min refresh", "Automated reports", "CSV / Excel export", "Priority support", "API access"].map(f => (
            <li key={f} className="flex gap-2"><Check className="size-4 text-accent shrink-0 mt-0.5" />{f}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl glass divide-y divide-border">
        <div className="p-4 text-sm font-medium">Recent invoices</div>
        {[
          { id: "INV-2026-005", date: "May 1, 2026", amount: "$49.00", status: "Paid" },
          { id: "INV-2026-004", date: "Apr 1, 2026", amount: "$49.00", status: "Paid" },
          { id: "INV-2026-003", date: "Mar 1, 2026", amount: "$49.00", status: "Paid" },
        ].map(i => (
          <div key={i.id} className="p-4 flex items-center justify-between text-sm">
            <div className="font-mono text-xs">{i.id}</div>
            <div className="text-muted-foreground">{i.date}</div>
            <div className="tabular-nums">{i.amount}</div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-success/15 text-success border border-success/30">{i.status}</span>
            <button className="text-xs text-muted-foreground hover:text-foreground">Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
