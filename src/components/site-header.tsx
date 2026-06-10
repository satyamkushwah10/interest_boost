import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 mt-4">
        <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-secondary grid place-items-center">
              <BarChart3 className="size-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold tracking-tight">InterestBoost</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Stats</a>
            {/* <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a> */}
            <a href="#testimonials" className="hover:text-foreground transition-colors">Customers</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/signup"
              className="hidden sm:inline-flex h-9 items-center px-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/login"
              className="hidden sm:inline-flex h-9 items-center px-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
            {/* <Link
              to="/dashboard"
              className="inline-flex h-9 items-center rounded-lg bg-gradient-to-r from-primary to-secondary px-4 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-8px_var(--primary)] hover:opacity-95 transition"
            >
              Open Dashboard
            </Link> */}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
