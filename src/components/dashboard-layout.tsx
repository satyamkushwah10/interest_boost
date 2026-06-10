import { Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  BarChart3, LayoutDashboard, Database, LineChart, FileText, Settings, CreditCard,
  Search, Bell, ChevronDown, TrendingUp, LogOut
} from "lucide-react";
import { getSession, logout as logoutUser } from "@/lib/auth";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  // { to: "/dashboard/interest", label: "Interest", icon: TrendingUp },
  { to: "/dashboard/marketplace", label: "Marketplace Data", icon: Database },
  { to: "/dashboard/analytics", label: "Analytics", icon: LineChart },
  // { to: "/dashboard/reports", label: "Reports", icon: FileText },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
  // { to: "/dashboard/billing", label: "Billing", icon: CreditCard },
] as const;

export function DashboardLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [session, setSession] = useState(getSession());
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    setSession(getSession());
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate({ to: "/login" });
  };

  const userName = session?.fullName || "Guest";
  const userInitials = session?.initials || "GU";

  return (
    <div className="min-h-screen flex bg-background">
      {/* <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-sidebar"> */}
      <aside className="hidden fixed md:flex  left-0 top-0 h-screen w-60 overflow-y-auto shrink-0 flex-col border-r border-border bg-sidebar z-40">
        <div className="h-14 flex items-center gap-2 px-5 border-b border-border">
          <div className="size-7 rounded-md bg-linear-to-br from-primary to-secondary grid place-items-center">
            <BarChart3 className="size-3.5 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold tracking-tight text-sm">InterestBoost</span>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {nav.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-linear-to-r from-primary/20 to-secondary/10 text-foreground border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/4"
                }`}
              >
                <n.icon className="size-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        {/* <div className="p-3 border-t border-border">
          <div className="glass rounded-xl p-3">
            <div className="text-xs font-medium">Pro trial</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">9 days remaining</div>
            <button className="mt-2 w-full h-8 rounded-md bg-linear-to-r from-primary to-secondary text-[11px] font-medium text-primary-foreground">Upgrade</button>
          </div>
        </div> */}
      </aside>
      <div className="flex-1 flex flex-col min-w-0 md:ml-60">
        <header className="h-14 border-b border-border flex items-center px-5 gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              placeholder="Search listings, sellers, categories…"
              className="w-full h-9 rounded-lg bg-card border border-border pl-9 pr-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="size-9 rounded-lg glass grid place-items-center text-muted-foreground hover:text-foreground transition relative">
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-accent" />
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowLogout(!showLogout)}
              className="h-9 flex items-center gap-2 rounded-lg glass px-2 pr-3 hover:bg-white/8 transition"
            >
              <div className="size-6 rounded-md bg-linear-to-br from-primary to-secondary grid place-items-center text-[10px] font-medium text-primary-foreground">
                {userInitials}
              </div>
              <span className="text-sm">{userName}</span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
            {showLogout && (
              <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2 rounded-lg transition"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
    
  );
}
