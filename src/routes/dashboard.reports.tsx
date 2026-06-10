import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/reports")({
  head: () => ({ meta: [{ title: "Reports — InterestBoost" }] }),
  component: Reports,
});

const reports = [
  { name: "Weekly Performance Digest", date: "2026-06-02", size: "1.2 MB" },
  { name: "Top Categories — May", date: "2026-05-31", size: "820 KB" },
  { name: "Lead Conversion Snapshot", date: "2026-05-28", size: "540 KB" },
  { name: "Seller Cohort Analysis", date: "2026-05-21", size: "2.1 MB" },
];

function Reports() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold">Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">Automated weekly digests and on-demand exports.</p>
      </div>
      <div className="rounded-2xl glass divide-y divide-border">
        {reports.map(r => (
          <div key={r.name} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 grid place-items-center">
                <FileText className="size-4" />
              </div>
              <div>
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.date} · {r.size}</div>
              </div>
            </div>
            <button className="h-9 px-3 rounded-lg glass text-sm inline-flex items-center gap-2 hover:bg-white/10 transition">
              <Download className="size-4" /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
