import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import {
  Search,
  Users,
  Network,
  TrendingUp,
  Target,
  Zap,
  Sparkles,
  Globe,
  Database,
  Check,
  Star,
  ArrowRight,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Counter } from "@/components/counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "InterestBoost — Discover Facebook Interests & Audience Insights",
      },
      {
        name: "description",
        content:
          "Search millions of Facebook interests using Meta Graph API. Discover audience insights, related interests, and targeting opportunities.",
      },
      {
        property: "og:title",
        content: "InterestBoost — Discover Facebook Interests & Audience Insights",
      },
      {
        property: "og:description",
        content: "The fastest way to discover Facebook interests and audience opportunities.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Search,
    title: "Interest Search",
    desc: "Find Facebook interests instantly from Meta Graph API.",
  },
  {
    icon: Users,
    title: "Audience Insights",
    desc: "Analyze audience size and targeting opportunities.",
  },
  {
    icon: Network,
    title: "Related Interests",
    desc: "Discover hidden audience connections and expansion ideas.",
  },
  {
    icon: TrendingUp,
    title: "Interest Expansion",
    desc: "Generate hundreds of related interests from a single keyword.",
  },
  {
    icon: Target,
    title: "Ad Targeting Research",
    desc: "Build better audience stacks for Facebook campaigns.",
  },
  {
    icon: Zap,
    title: "Real-Time API Data",
    desc: "Powered directly by Meta Graph API.",
  },
];

const stats = [
  {
    label: "Interests Indexed",
    value: 25000,
    suffix: "+",
  },
  {
    label: "Audience Records",
    value: 21000,
    suffix: "+",
  },
  {
    label: "API Requests Processed",
    value: 98000,
    suffix: "+",
  },
  {
    label: "Active Advertisers",
    value: 12000,
    suffix: "+",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Get started with audience discovery.",
    features: ["100 searches/day", "Audience size data", "Related interests"],
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "$29",
    desc: "For media buyers and marketers.",
    features: [
      "Unlimited searches",
      "Interest expansion",
      "CSV export",
      "API access",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$99",
    desc: "For teams and agencies.",
    features: [
      "Team access",
      "Bulk lookup",
      "White-label reports",
      "Advanced analytics",
      "Dedicated support",
    ],
    cta: "Contact Sales",
  },
];

const testimonials = [
  {
    quote: "We discovered profitable audiences we couldn't find inside Ads Manager.",
    author: "Michael Ross",
    role: "Media Buyer",
  },
  {
    quote: "Audience research that used to take hours now takes minutes.",
    author: "Sarah Ahmed",
    role: "Facebook Ads Consultant",
  },
  {
    quote: "The related interest engine helped us reduce CPA by 32%.",
    author: "Daniel Wong",
    role: "Growth Marketer",
  },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-40 pb-24">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground"
          >
            <Sparkles className="size-3 text-accent" />
            Powered by Meta Graph API
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight"
          >
            Discover Winning
            <span className="text-gradient-primary"> Facebook Interests</span>
            <br />
            Before Your Competitors
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Search millions of Facebook interests, uncover hidden audience opportunities, analyze
            audience sizes, and build better ad campaigns using real Meta Graph API data.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex items-center justify-center gap-3 flex-wrap"
          >
            <Link
              to="/signup"
              className="group inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 text-sm font-medium text-primary-foreground shadow-[0_0_40px_-8px_var(--primary)] hover:opacity-95 transition"
            >
              Start Free Search
            </Link>
            {/* <button className="inline-flex h-11 items-center gap-2 rounded-xl glass px-5 text-sm font-medium hover:bg-white/10 transition">
              <Play className="size-4" /> Watch Demo
            </button> */}
          </motion.div>

          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 relative"
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-primary/40 via-secondary/30 to-accent/30 blur-2xl opacity-50" />
            <div className="relative glass rounded-3xl p-3 shadow-[var(--shadow-elegant)]">
              <div className="rounded-2xl bg-card/80 border border-border overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
                  <span className="size-2.5 rounded-full bg-destructive/70" />
                  <span className="size-2.5 rounded-full bg-warning/70" />
                  <span className="size-2.5 rounded-full bg-success/70" />
                  <span className="ml-3 text-xs text-muted-foreground">
                    app.interestboost.com / interests/shopify
                  </span>
                </div>
                <div className="grid md:grid-cols-4 gap-px bg-border">
                  {[
                    {
                      label: "Audience Size",
                      val: "48.2M",
                    },
                    {
                      label: "Related Interests",
                      val: "124",
                    },
                    {
                      label: "Competition",
                      val: "Medium",
                    },
                    {
                      label: "Reach Score",
                      val: "91%",
                    },
                  ].map((s) => (
                    <div key={s.label} className="bg-card p-5 text-left">
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                      <div className="mt-1 font-display text-2xl">{s.val}</div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-card grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 h-40 rounded-xl bg-gradient-to-br from-primary/15 via-secondary/10 to-transparent border border-border relative overflow-hidden">
                    <svg viewBox="0 0 400 120" className="absolute inset-0 w-full h-full">
                      <defs>
                        <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0" stopColor="oklch(0.585 0.214 264)" stopOpacity="0.5" />
                          <stop offset="1" stopColor="oklch(0.585 0.214 264)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 90 C 40 60, 80 110, 120 70 S 200 30, 240 50 S 320 20, 400 40 L400 120 L0 120 Z"
                        fill="url(#lg)"
                      />
                      <path
                        d="M0 90 C 40 60, 80 110, 120 70 S 200 30, 240 50 S 320 20, 400 40"
                        fill="none"
                        stroke="oklch(0.7 0.2 264)"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    {["E-commerce", "Dropshipping", "WooCommerce", "Digital Marketing"].map(
                      (c, i) => (
                        <div key={c} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{c}</span>
                          <div className="flex-1 mx-3 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                              style={{ width: `${80 - i * 14}%` }}
                            />
                          </div>
                          <span className="tabular-nums text-xs">{80 - i * 14}%</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-accent">Platform</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold">
              Everything you need to win the marketplace.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built for operators who treat resale like an asset class.
            </p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative rounded-2xl p-6 glass hover:bg-white/[0.06] transition"
              >
                <div className="size-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 grid place-items-center mb-5">
                  <f.icon className="size-5 text-foreground" />
                </div>
                <h3 className="font-display text-lg font-medium">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-accent">Use Cases</div>

            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold">
              Built For Modern Advertisers
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-5 mt-14">
            {[
              {
                icon: Target,
                title: "Media Buyers",
              },
              {
                icon: Globe,
                title: "Agencies",
              },
              {
                icon: TrendingUp,
                title: "E-commerce Brands",
              },
              {
                icon: Database,
                title: "Lead Generation",
              },
            ].map((item) => (
              <div key={item.title} className="glass rounded-2xl p-6 text-center">
                <item.icon className="size-8 mx-auto mb-4 text-primary" />

                <h3 className="font-medium">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Stats */}
      <section id="stats" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl glass p-10 md:p-14 relative overflow-hidden">
            <div
              className="absolute inset-0 -z-10 opacity-50"
              style={{ background: "var(--gradient-hero)" }}
            />
            <div className="grid md:grid-cols-4 gap-10 text-center md:text-left">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl md:text-5xl font-semibold text-gradient">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      {/* <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-accent">Pricing</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold">
              Simple plans that scale with you.
            </h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl p-7 glass ${p.highlight ? "ring-1 ring-primary/50 shadow-[var(--shadow-glow)]" : ""}`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full px-3 py-1">
                    Most popular
                  </div>
                )}
                <div className="font-display text-lg">{p.name}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold">{p.price}</span>
                  {p.price !== "Custom" && (
                    <span className="text-sm text-muted-foreground">/mo</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="size-4 text-accent shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-7 w-full h-10 rounded-xl text-sm font-medium transition ${
                    p.highlight
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-95"
                      : "glass hover:bg-white/10"
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-accent">Customers</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold">
              Loved by serious sellers.
            </h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.author} className="rounded-2xl p-7 glass">
                <div className="flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-foreground/90 leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="size-9 rounded-full bg-gradient-to-br from-primary to-secondary grid place-items-center text-xs font-medium">
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.author}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl p-12 text-center relative overflow-hidden glass">
            <div
              className="absolute inset-0 -z-10"
              style={{ background: "var(--gradient-hero)" }}
            />
            <h3 className="font-display text-3xl md:text-4xl font-semibold">
              Ready To Find Your Next Winning Audience?
            </h3>

            <p className="mt-3 text-muted-foreground">
              Access millions of Facebook interests and uncover hidden targeting opportunities
              today.
            </p>
            <Link
              to="/signup"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 text-sm font-medium text-primary-foreground shadow-[0_0_40px_-8px_var(--primary)]"
            >
              Start Free Trial <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
