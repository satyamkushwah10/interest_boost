/**
 * Facebook Marketplace API service layer.
 *
 * Note: Facebook Graph API does not currently expose Marketplace listings publicly.
 * This service is structured to plug into a future official API or a compliant
 * third-party data provider. For now, functions are typed and ready to wire up.
 *
 * Configure FB_GRAPH_TOKEN as a runtime secret (Lovable Cloud) when going live.
 */

import type { Listing } from "@/lib/mock-data";

const BASE_URL = "https://graph.facebook.com/v19.0";

async function withRetry<T>(fn: () => Promise<T>, attempts = 3, baseDelayMs = 400): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); }
    catch (err) {
      lastErr = err;
      await new Promise(r => setTimeout(r, baseDelayMs * 2 ** i));
    }
  }
  throw lastErr;
}

async function authedFetch(path: string, init?: RequestInit) {
  const token = process.env.FB_GRAPH_TOKEN;
  if (!token) throw new Error("FB_GRAPH_TOKEN is not configured.");
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (res.status === 429) throw new Error("Rate limited by Facebook Graph API.");
  if (!res.ok) throw new Error(`Facebook API error ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function fetchMarketplaceListings(params: { limit?: number; after?: string } = {}): Promise<Listing[]> {
  return withRetry(async () => {
    const search = new URLSearchParams();
    if (params.limit) search.set("limit", String(params.limit));
    if (params.after) search.set("after", params.after);
    await authedFetch(`/me/marketplace_listings?${search.toString()}`);
    return [];
  });
}

export async function fetchListingAnalytics(listingId: string) {
  return withRetry(() => authedFetch(`/${listingId}/insights`));
}

export async function fetchSellerData(sellerId: string) {
  return withRetry(() => authedFetch(`/${sellerId}?fields=id,name,verified,rating`));
}

export async function fetchCategoryInsights(category: string) {
  return withRetry(() => authedFetch(`/marketplace_categories/${encodeURIComponent(category)}/insights`));
}
