import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({ title, subtitle, children, footer }: {
  title: string; subtitle: string; children: ReactNode; footer: ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <div className="flex flex-col p-8">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-secondary grid place-items-center">
            <BarChart3 className="size-4 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold">InterestBoost</span>
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="m-auto w-full max-w-sm"
        >
          <h1 className="font-display text-3xl font-semibold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8 glass rounded-2xl p-6">{children}</div>
          <div className="mt-6 text-sm text-muted-foreground text-center">{footer}</div>
        </motion.div>
      </div>
      <div className="hidden lg:flex relative items-center justify-center p-12 border-l border-border/60">
        <div className="absolute inset-0 -z-10 opacity-80" style={{ background: "var(--gradient-hero)" }} />
        <div className="max-w-md">
          <div className="font-display text-4xl font-semibold leading-tight">
            Marketplace <span className="text-gradient-primary">intelligence</span> built for operators.
          </div>
          <p className="mt-4 text-muted-foreground">
            Join 8,000+ sellers using InterestBoost to track listings, spot trends, and price with confidence.
          </p>
          <div className="mt-10 glass rounded-2xl p-5">
            <div className="text-sm text-muted-foreground">"We replaced three dashboards with InterestBoost in a week."</div>
            <div className="mt-3 text-xs">— Priya Patel, Vintage Loop</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuthInput({ label, type = "text", placeholder, hint }: { label: string; type?: string; placeholder?: string; hint?: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full h-10 rounded-lg bg-background/40 border border-border px-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition"
      />
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export function AuthButton({ children }: { children: ReactNode }) {
  return (
    <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-secondary text-sm font-medium text-primary-foreground shadow-[0_0_30px_-8px_var(--primary)] hover:opacity-95 transition">
      {children}
    </button>
  );
}

// export function GoogleButton() {
//   return (
//     <button className="w-full h-10 rounded-lg glass hover:bg-white/10 text-sm font-medium flex items-center justify-center gap-2 transition">
//       <svg viewBox="0 0 24 24" className="size-4"><path fill="#fff" d="M21.35 11.1H12v3.2h5.35c-.5 2.4-2.55 3.7-5.35 3.7-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8c1.5 0 2.85.55 3.9 1.45l2.4-2.4C16.7 3.85 14.5 3 12 3 7 3 3 7 3 12s4 9 9 9c5.2 0 8.6-3.65 8.6-8.8 0-.4 0-.75-.05-1.1z"/></svg>
//       Continue with Google
//     </button>
//   );
// }
