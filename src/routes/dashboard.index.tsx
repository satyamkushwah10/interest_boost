import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, AreaChart, Area,
} from "recharts";
import { TrendingUp, TrendingDown, Eye, Users, Activity, DollarSign, ArrowUpRight } from "lucide-react";
import { dailyActivity, categoryPerformance, listings } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboard — InterestBoost" }] }),
  component: DashboardHome,
});

const kpis = [
  { label: "Total Listings", value: "12,480", delta: "+12.4%", up: true, icon: Activity },
  { label: "Active Listings", value: "9,322", delta: "+4.1%", up: true, icon: Eye },
  { label: "Interested Leads", value: "3,104", delta: "-1.8%", up: false, icon: Users },
  { label: "Conversion Rate", value: "24.6%", delta: "+3.2%", up: true, icon: DollarSign },
];

interface Interest {
  id: string;
  name: string;
  audience_size_lower_bound: number;
  audience_size_upper_bound: number;
  path?: string[];
  topic?: string;
}

function DashboardHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const accessToken = import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN;

  const fetchData = async (query: string) => {
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const fbResponse = await fetch(
        `https://graph.facebook.com/v18.0/search?type=adinterest&q=${encodeURIComponent(
          query
        )}&limit=1000&access_token=${accessToken}`
      );

      if (!fbResponse.ok) {
        throw new Error("Failed to fetch Facebook data");
      }

      const fbData = await fbResponse.json();
      setResults(fbData.data || []);
      setCurrentPage(1);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    await fetchData(searchTerm);
  };

  const formatAudienceSize = (number: number) => {
    if (number >= 1_000_000_000)
      return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    if (number >= 1_000_000)
      return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (number >= 1_000)
      return (number / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return number.toString();
  };

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Interest Search Section */}
      <div className="rounded-2xl glass p-5 border border-border">
        <div className="mb-4">
          <h2 className="font-display text-lg font-semibold mb-2">Interest Discovery Engine</h2>
          <p className="text-xs text-muted-foreground">Search millions of Facebook audience interests to improve targeting</p>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search interests (e.g., Fitness, Gaming, Fashion)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-card border border-border text-foreground rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground/70"
          />
          <button
            type="submit"
            className="bg-linear-to-r from-primary to-secondary hover:opacity-90 transition text-primary-foreground px-6 py-2 rounded-lg font-medium"
          >
            Search
          </button>
        </form>

        {/* Interest Search State Messages */}
        {error && (
          <div className="bg-destructive/20 border border-destructive/30 text-destructive px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-6 text-muted-foreground">
            Loading interests...
          </div>
        )}

        
           {!hasSearched &&  !loading &&(
      <div className="mb-10 overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-blue-950/40 via-gray-900 to-purple-950/30 p-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            Interest Discovery Engine
          </div>

      <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">
        Find Your Best Interests
      </h1>

      <p className="mt-4 text-lg text-gray-400 leading-relaxed">
        Discover high-value Facebook interests and audience segments to improve
        ad targeting, increase engagement, and maximize campaign performance.
        Search millions of audience interests and uncover opportunities that
        help your ads reach the right people.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <div className="rounded-xl border border-gray-800 bg-gray-900/60 px-4 py-3">
          <div className="text-sm font-medium text-white">
            🎯 Precise Targeting
          </div>
          <div className="text-xs text-gray-400">
            Find audiences that match your niche.
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/60 px-4 py-3">
          <div className="text-sm font-medium text-white">
            📈 Audience Insights
          </div>
          <div className="text-xs text-gray-400">
            Explore audience size and categories.
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/60 px-4 py-3">
          <div className="text-sm font-medium text-white">
            🚀 Better Campaign Results
          </div>
          <div className="text-xs text-gray-400">
            Optimize targeting for higher conversions.
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Start by entering a keyword such as{" "}
        <span className="text-blue-400">Fitness</span>,{" "}
        <span className="text-blue-400">Gaming</span>,{" "}
        <span className="text-blue-400">Fashion</span>, or{" "}
        <span className="text-blue-400">E-commerce</span>.
      </p>
        </div>
        </div>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            No interests found. Try a different search term.
          </div>
        )}
        

        {/* Interest Results Table */}
        {!loading && results.length > 0 && (
          <>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground border-b border-border">
                    <th className="py-2 font-normal px-3">#</th>
                    <th className="py-2 font-normal px-3">Interest Name</th>
                    <th className="py-2 font-normal px-3">Audience Size</th>
                    <th className="py-2 font-normal px-3">Category Path</th>
                    <th className="py-2 font-normal px-3">Topic</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-border/60 hover:bg-white/3 transition">
                    
                      <td className="py-3 px-3">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="py-3 px-3 font-medium truncate">{item.name}</td>
                      <td className="py-3 px-3 w-40 text-muted-foreground">
                        {formatAudienceSize(item.audience_size_lower_bound)} -{" "}
                        {formatAudienceSize(item.audience_size_upper_bound)}
                      </td>
                      <td className="py-3 px-3 text-muted-foreground text-xs">
                        {item.path?.join(" → ") || "-"}
                      </td>
                      <td className="py-3 px-3 text-muted-foreground">
                        {item.topic || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-border rounded text-sm disabled:opacity-40 hover:bg-white/4 transition"
                >
                  Prev
                </button>
                <span className="text-xs text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-border rounded text-sm disabled:opacity-40 hover:bg-white/4 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

  
    </div>
    
  );
}
