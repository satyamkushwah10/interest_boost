import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Facebook, Key, Bell, User } from "lucide-react";
import { getSession } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — InterestBoost" }] }),
  component: Settings,
});

function Section({ icon: Icon, title, desc, children }: { icon: typeof User; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl glass p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="size-9 rounded-lg bg-linear-to-br from-primary/20 to-secondary/20 grid place-items-center"><Icon className="size-4" /></div>
        <div>
          <div className="font-display text-base font-medium">{title}</div>
          <div className="text-xs text-muted-foreground">{desc}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input type={type} value={value}
        readOnly
        className="mt-1.5 w-full h-9 rounded-lg bg-background/40 border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
    </label>
  );
}

function Settings() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const session = getSession();
    if (session) {
      setFullName(session.fullName);
      setEmail(session.email);
    }
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your profile, connections, and preferences.</p>
      </div>

      <Section icon={User} title="Profile" desc="How you appear across InterestBoost.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full name" value={fullName || "Not signed in"} />
          <Field label="Email" value={email || "No email available"} type="email" />
        </div>
      </Section>

      {/* <Section icon={Facebook} title="Facebook Connection" desc="Connect your Facebook account to sync Marketplace data.">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <div>Not connected</div>
            <div className="text-xs text-muted-foreground">Required for live listing imports.</div>
          </div>
          <button className="h-9 px-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-sm font-medium text-primary-foreground">Connect Facebook</button>
        </div>
      </Section> */}

      {/* <Section icon={Key} title="API Keys" desc="Programmatic access to your workspace data.">
        <div className="flex items-center justify-between rounded-lg bg-background/40 border border-border px-3 py-2 font-mono text-xs">
          <span>sk_live_••••••••••••••••3a7d</span>
          <button className="text-muted-foreground hover:text-foreground">Rotate</button>
        </div>
      </Section> */}

      <Section icon={Bell} title="Notifications" desc="Choose what we email you about.">
        <div className="space-y-3 text-sm">
          {["Daily digest", "Weekly performance report", "New lead alerts", "Trend spikes"].map(l => (
            <label key={l} className="flex items-center justify-between">
              <span>{l}</span>
              <input type="checkbox" defaultChecked className="accent-primary size-4" />
            </label>
          ))}
        </div>
      </Section>
    </div>
  );
}
