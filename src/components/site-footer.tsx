import { Github, Twitter, Linkedin } from "lucide-react";

export function SiteFooter() {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "Integrations"] },
    { title: "Company", links: ["About", "Customers", "Careers", "Contact"] },
    { title: "Resources", links: ["Documentation", "API Reference", "Guides", "Status"] },
    { title: "Legal", links: ["Privacy Policy", "Terms", "Security", "Cookies"] },
  ];
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-6">
        <div className="md:col-span-2">
          <div className="font-display text-xl font-semibold">InterestBoost</div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Marketplace intelligence for sellers, resellers, and operators who move fast.
          </p>
          <div className="flex gap-3 mt-5 text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors"><Twitter className="size-4" /></a>
            <a href="#" className="hover:text-foreground transition-colors"><Github className="size-4" /></a>
            <a href="#" className="hover:text-foreground transition-colors"><Linkedin className="size-4" /></a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{c.title}</div>
            <ul className="space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l}><a className="text-foreground/80 hover:text-foreground transition-colors" href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} InterestBoost, Inc. All rights reserved.
      </div>
    </footer>
  );
}
