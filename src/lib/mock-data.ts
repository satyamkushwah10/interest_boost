export interface Listing {
  id: string;
  title: string;
  category: string;
  price: number;
  location: string;
  seller: string;
  postedDate: string;
  status: "Active" | "Sold" | "Pending" | "Expired";
  views: number;
  interested: number;
}

const categories = ["Electronics", "Furniture", "Vehicles", "Fashion", "Home & Garden", "Sports", "Toys", "Books"];
const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Miami, FL", "Seattle, WA", "Boston, MA", "Austin, TX"];
const sellers = ["Alex Carter", "Maya Singh", "Jordan Lee", "Priya Patel", "Sam Rivera", "Chloe Kim", "Marcus Webb", "Nora Bennett", "Ethan Brooks", "Zara Ahmed"];
const titles = [
  "iPhone 15 Pro Max — Mint Condition",
  "Mid-Century Walnut Dining Table",
  "2019 Honda Civic Sport — Low Miles",
  "Vintage Leather Jacket, Size M",
  "Standing Desk with Monitor Arm",
  "Peloton Bike+ with Accessories",
  "Lego Star Wars Millennium Falcon",
  "MacBook Pro 16\" M3 Max",
  "Restored Eames Lounge Chair",
  "Canon EOS R5 + 24-70mm Lens",
  "Mountain Bike — Trek Fuel EX 9",
  "Nintendo Switch OLED Bundle",
  "Persian Rug 8x10 Hand-Knotted",
  "Sony A7 IV Mirrorless Camera",
  "Herman Miller Aeron — Size B",
  "Tesla Wall Connector Gen 3",
  "Vintage Rolex Submariner 1985",
  "Patagonia Down Jacket — XL",
  "Espresso Machine — Breville Dual Boiler",
  "Original Banksy Print — Numbered",
];

const statuses: Listing["status"][] = ["Active", "Active", "Active", "Pending", "Sold", "Expired"];

function seeded(i: number, max: number) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return Math.floor((x - Math.floor(x)) * max);
}

export const listings: Listing[] = Array.from({ length: 248 }, (_, i) => ({
  id: `FB-${String(100000 + i).padStart(6, "0")}`,
  title: titles[seeded(i + 1, titles.length)],
  category: categories[seeded(i + 2, categories.length)],
  price: 25 + seeded(i + 3, 4800),
  location: locations[seeded(i + 4, locations.length)],
  seller: sellers[seeded(i + 5, sellers.length)],
  postedDate: new Date(Date.now() - seeded(i + 6, 60) * 86400000).toISOString().slice(0, 10),
  status: statuses[seeded(i + 7, statuses.length)],
  views: 40 + seeded(i + 8, 12000),
  interested: seeded(i + 9, 240),
}));

export const dailyActivity = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  listings: 80 + seeded(i + 100, 220),
  leads: 20 + seeded(i + 200, 120),
}));

export const categoryPerformance = categories.map((c, i) => ({
  category: c,
  listings: 120 + seeded(i + 50, 480),
  revenue: 1000 + seeded(i + 60, 9000),
}));

export const marketplaceDistribution = [
  { name: "Electronics", value: 32 },
  { name: "Furniture", value: 21 },
  { name: "Vehicles", value: 18 },
  { name: "Fashion", value: 14 },
  { name: "Other", value: 15 },
];
