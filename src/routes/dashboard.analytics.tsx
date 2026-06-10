import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { dailyActivity, categoryPerformance, marketplaceDistribution } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Analytics — InterestBoost" }] }),
  component: AnalyticsPage,
});

const COLORS = ["oklch(0.585 0.214 264)", "oklch(0.55 0.25 295)", "oklch(0.74 0.14 207)", "oklch(0.7 0.16 155)", "oklch(0.78 0.15 75)"];

function AnalyticsPage() {
  const showComingSoon = true;
  return (
      //  <div className="relative p-6 md:p-8 space-y-6">
      <div
  className={`relative p-6 md:p-8 space-y-6 ${
    showComingSoon ? "h-screen overflow-hidden" : ""
  }`}
>
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Deep insights into your marketplace performance.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl glass p-5">
          <div className="mb-4">
            <div className="font-display text-base font-medium">Daily Listing Activity</div>
            <div className="text-xs text-muted-foreground">Listings vs interested leads</div>
          </div>
          <div className="h-72">
            <ClientOnly fallback={<div className="h-full w-full animate-pulse rounded-lg bg-white/[0.03]" />}>
              <ResponsiveContainer>
              <LineChart data={dailyActivity}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "oklch(0.7 0.02 256)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.7 0.02 256)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.035 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="listings" stroke="oklch(0.7 0.2 264)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="leads" stroke="oklch(0.74 0.14 207)" strokeWidth={2} dot={false} />
              </LineChart>
              </ResponsiveContainer>
            </ClientOnly>
          </div>
        </div>

        <div className="rounded-2xl glass p-5">
          <div className="mb-4">
            <div className="font-display text-base font-medium">Category Revenue</div>
            <div className="text-xs text-muted-foreground">Estimated revenue by category</div>
          </div>
          <div className="h-72">
            <ClientOnly fallback={<div className="h-full w-full animate-pulse rounded-lg bg-white/[0.03]" />}>
              <ResponsiveContainer>
              <BarChart data={categoryPerformance}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="category" tick={{ fill: "oklch(0.7 0.02 256)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.7 0.02 256)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.035 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]} fill="oklch(0.55 0.25 295)" />
              </BarChart>
              </ResponsiveContainer>
            </ClientOnly>
          </div>
        </div>

        <div className="rounded-2xl glass p-5 lg:col-span-2">
          <div className="mb-4">
            <div className="font-display text-base font-medium">Marketplace Distribution</div>
            <div className="text-xs text-muted-foreground">Share of total listings</div>
          </div>
          <div className="h-80">
            <ClientOnly fallback={<div className="h-full w-full animate-pulse rounded-lg bg-white/[0.03]" />}>
              <ResponsiveContainer>
              <PieChart>
                <Pie data={marketplaceDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={120} paddingAngle={2}>
                  {marketplaceDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />)}
                </Pie>
                <Tooltip contentStyle={{ background: "oklch(0.22 0.035 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
              </ResponsiveContainer>
            </ClientOnly>
          </div>
        </div>
      </div>
     {showComingSoon && (
  <div className="absolute inset-0 z-30 flex items-start justify-center pt-20 md:pt-32">
    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm rounded-2xl" />

    <div className="relative z-40 max-w-sm w-full text-center p-6 rounded-xl border border-border bg-card/90">
      <h2 className="text-2xl font-semibold">Coming Soon</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Analytics is coming soon — stay tuned.
      </p>
    </div>
  </div>
)}
    </div>
  );
}
