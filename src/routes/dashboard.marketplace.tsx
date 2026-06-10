import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import {
  flexRender, getCoreRowModel, getPaginationRowModel,
  getSortedRowModel, useReactTable, type ColumnDef, type SortingState,
} from "@tanstack/react-table";
import {
  ArrowUpDown, ChevronLeft, ChevronRight, Download, Filter as FilterIcon, Search, Loader2
} from "lucide-react";
import { type Listing } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/marketplace")({
  head: () => ({ meta: [{ title: "Marketplace Data — InterestBoost" }] }),
  component: MarketplacePage,
});

const statusStyles: Record<Listing["status"], string> = {
  Active: "bg-success/15 text-success border-success/30",
  Sold: "bg-muted text-muted-foreground border-border",
  Pending: "bg-warning/15 text-warning border-warning/30",
  Expired: "bg-destructive/15 text-destructive border-destructive/30",
};

function exportCSV(rows: Listing[]) {
  const headers = ["id","title","category","price","location","seller","postedDate","status","views","interested"];
  const csv = [headers.join(","), ...rows.map(r => headers.map(h => JSON.stringify((r as unknown as Record<string, unknown>)[h] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "marketplace-listings.csv"; a.click();
  URL.revokeObjectURL(url);
}

function MarketplacePage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [rowSelection, setRowSelection] = useState({});

  // API Integration States
  const [listingsData, setListingsData] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce setup: updates 'debouncedSearch' 500ms after user stops typing
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(globalFilter);
    }, 500);

    return () => clearTimeout(handler);
  }, [globalFilter]);

  // Fetch Data from Meta / Proxy API
  useEffect(() => {
    async function fetchMetaMarketplaceData() {
      setIsLoading(true);
      setError(null);
      try {
        // Construct query parameters based on Meta Graph API specs or your backend proxy
        const params = new URLSearchParams({
          q: debouncedSearch,
          category: category !== "all" ? category : "",
          status: status !== "all" ? status : "",
        });

        // Replace with your actual proxy endpoint or Meta integration URL
        const response = await fetch(`/api/meta/marketplace?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch live marketplace data from Meta.");
        }

        const json = await response.json();
        // Fallback to json.data if Meta structures payload inside a data array
        setListingsData(json.data || json); 
      } catch (err) {
        console.error("Meta API error:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMetaMarketplaceData();
  }, [debouncedSearch, category, status]); // Triggers automatically when filters change

  const columns = useMemo<ColumnDef<Listing>[]>(() => [
    {
      id: "select",
      header: ({ table }) => (
        <input type="checkbox" className="accent-primary"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()} />
      ),
      cell: ({ row }) => (
        <input type="checkbox" className="accent-primary"
          checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
      ),
      enableSorting: false,
    },
    { accessorKey: "id", header: "Listing ID", cell: (i) => <span className="text-xs text-muted-foreground tabular-nums">{i.getValue() as string}</span> },
    { accessorKey: "title", header: "Title", cell: (i) => <span className="font-medium">{i.getValue() as string}</span> },
    { accessorKey: "category", header: "Category", cell: (i) => <span className="text-muted-foreground">{i.getValue() as string}</span> },
    { accessorKey: "price", header: "Price", cell: (i) => <span className="tabular-nums">${(i.getValue() as number).toLocaleString()}</span> },
    { accessorKey: "location", header: "Location", cell: (i) => <span className="text-muted-foreground">{i.getValue() as string}</span> },
    { accessorKey: "seller", header: "Seller" },
    { accessorKey: "postedDate", header: "Posted", cell: (i) => <span className="text-muted-foreground tabular-nums">{i.getValue() as string}</span> },
    { accessorKey: "status", header: "Status", cell: (i) => {
      const v = i.getValue() as Listing["status"];
      return <span className={`inline-flex items-center text-[11px] px-2 py-0.5 rounded-full border ${statusStyles[v]}`}>{v}</span>;
    }},
    { accessorKey: "views", header: "Views", cell: (i) => <span className="tabular-nums text-muted-foreground">{(i.getValue() as number).toLocaleString()}</span> },
    { accessorKey: "interested", header: "Interested", cell: (i) => <span className="tabular-nums">{i.getValue() as number}</span> },
  ], []);

  const table = useReactTable({
    data: listingsData, // Hooked up to API data state
    columns,
    state: { sorting, globalFilter, rowSelection },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // Note: getFilteredRowModel removed to avoid conflicting client-side evaluation
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  // Dynamic values extracted from your custom fetched list instead of global hardcoded mock data
  const categories = ["all", "Electronics", "Vehicles", "Property", "Apparel"]; // Replace with static array or dynamically mapping dynamic categories
  const statuses = ["all", "Active", "Pending", "Sold", "Expired"];
  const selectedCount = Object.keys(rowSelection).length;
  const total = listingsData.length;
  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, total);
  // Feature flag: show coming soon overlay with blur
  const showComingSoon = true;

  return (
    <div className="relative p-6 md:p-8 space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold">Marketplace Data</h1>
          <p className="mt-1 text-sm text-muted-foreground">Live feed of Facebook Marketplace listings tracked via Meta Graph API.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportCSV(listingsData)} className="h-9 px-3 rounded-lg glass text-sm inline-flex items-center gap-2 hover:bg-white/10 transition">
            <Download className="size-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="rounded-2xl glass p-4">
        <div className="flex gap-3 flex-wrap items-center">
          <div className="relative flex-1 min-w-[220px]">
            {isLoading ? (
              <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary animate-spin" />
            ) : (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            )}
            <input
              value={globalFilter} 
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search live Meta listings..."
              className="w-full h-9 rounded-lg bg-background/40 border border-border pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Select label="Category" value={category} onChange={setCategory} options={categories} />
          <Select label="Status" value={status} onChange={setStatus} options={statuses} />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <FilterIcon className="size-3.5" /> {total.toLocaleString()} listings found
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-xs text-destructive">
            {error}
          </div>
        )}

        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-card/60">
              {table.getHeaderGroups().map(hg => (
                <tr key={hg.id} className="border-b border-border">
                  {hg.headers.map(h => (
                    <th key={h.id} className="text-left text-xs font-medium text-muted-foreground px-3 py-2.5">
                      {h.isPlaceholder ? null : (
                        <button
                          className={`inline-flex items-center gap-1 ${h.column.getCanSort() ? "hover:text-foreground" : ""}`}
                          onClick={h.column.getToggleSortingHandler()}
                        >
                          {flexRender(h.column.columnDef.header, h.getContext())}
                          {h.column.getCanSort() && <ArrowUpDown className="size-3 opacity-50" />}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading && listingsData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-3 py-10 text-center text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="size-4 animate-spin text-primary" /> Fetching live data...
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="border-b border-border/60 hover:bg-white/[0.03] transition">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-3 py-3 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
              {!isLoading && listingsData.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="px-3 py-10 text-center text-sm text-muted-foreground">
                    No records found matching your query on Meta.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls remain unchanged but operate on real-time slice configurations */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-muted-foreground">
            Showing <span className="text-foreground tabular-nums">{total === 0 ? 0 : start}-{end}</span> of <span className="text-foreground tabular-nums">{total.toLocaleString()}</span> results
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}
              className="h-8 px-2 rounded-md glass hover:bg-white/10 disabled:opacity-40 inline-flex items-center gap-1"
            >
              <ChevronLeft className="size-3.5" /> Previous
            </button>
            <button
              onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}
              className="h-8 px-2 rounded-md glass hover:bg-white/10 disabled:opacity-40 inline-flex items-center gap-1"
            >
              Next <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
      {showComingSoon && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          <div className="relative mb-45 z-40 pointer-events-auto max-w-sm w-full text-center p-2 rounded-xl border border-border bg-card/90">
            <h2 className="text-2xl font-semibold">Coming Soon</h2>
            <p className="mt-2 text-sm text-muted-foreground">Marketplace integration is coming soon — stay tuned.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-lg bg-background/40 border border-border px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50">
        {options.map(o => <option key={o} value={o}>{o === "all" ? "All" : o}</option>)}
      </select>
    </label>
  );
}