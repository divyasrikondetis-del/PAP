import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, TrendingDown, Bell, Minus, MapPin, RefreshCw } from "lucide-react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { SkeletonCard } from "@/components/LoadingSkeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { tr } from "@/lib/translations";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CROP_EMOJIS: Record<string, string> = {
  Rice: "🌾", Wheat: "🌾", Cotton: "🧶", Sugarcane: "🎋", Soybean: "🫘",
  Maize: "🌽", Tomato: "🍅", Onion: "🧅", Potato: "🥔", Mustard: "🌻",
};

interface MarketData {
  name: string;
  distance: number;
  crops: { crop: string; pricePerKg: number; change: number }[];
}

const NEARBY_MARKETS: MarketData[] = [
  {
    name: "Kurnool Mandi", distance: 5,
    crops: [
      { crop: "Rice", pricePerKg: 22, change: 2.1 }, { crop: "Cotton", pricePerKg: 65, change: 3.5 },
      { crop: "Maize", pricePerKg: 19, change: -1.2 }, { crop: "Sugarcane", pricePerKg: 3.5, change: 0.5 },
      { crop: "Tomato", pricePerKg: 42, change: 8.2 }, { crop: "Onion", pricePerKg: 25, change: -3.1 },
      { crop: "Wheat", pricePerKg: 24, change: 1.8 }, { crop: "Soybean", pricePerKg: 48, change: -0.9 },
      { crop: "Potato", pricePerKg: 18, change: 1.2 }, { crop: "Mustard", pricePerKg: 55, change: 4.3 },
    ]
  },
  {
    name: "Vijayawada Market", distance: 18,
    crops: [
      { crop: "Rice", pricePerKg: 23, change: 1.8 }, { crop: "Cotton", pricePerKg: 63, change: 2.9 },
      { crop: "Maize", pricePerKg: 20, change: 0.5 }, { crop: "Sugarcane", pricePerKg: 3.8, change: 1.2 },
      { crop: "Tomato", pricePerKg: 38, change: -5.6 }, { crop: "Onion", pricePerKg: 28, change: 2.3 },
      { crop: "Wheat", pricePerKg: 25, change: -0.7 }, { crop: "Soybean", pricePerKg: 50, change: 1.1 },
      { crop: "Potato", pricePerKg: 16, change: -2.3 }, { crop: "Mustard", pricePerKg: 52, change: 3.1 },
    ]
  },
  {
    name: "Guntur Mandi", distance: 32,
    crops: [
      { crop: "Rice", pricePerKg: 21, change: 3.2 }, { crop: "Cotton", pricePerKg: 67, change: 4.1 },
      { crop: "Maize", pricePerKg: 18, change: -2.5 }, { crop: "Sugarcane", pricePerKg: 3.2, change: -0.8 },
      { crop: "Tomato", pricePerKg: 45, change: 12.1 }, { crop: "Onion", pricePerKg: 22, change: -6.2 },
      { crop: "Wheat", pricePerKg: 23, change: 2.1 }, { crop: "Soybean", pricePerKg: 47, change: -1.5 },
      { crop: "Potato", pricePerKg: 19, change: 0.5 }, { crop: "Mustard", pricePerKg: 54, change: 2.8 },
    ]
  },
  {
    name: "Raichur APMC", distance: 45,
    crops: [
      { crop: "Rice", pricePerKg: 20, change: 1.5 }, { crop: "Cotton", pricePerKg: 62, change: 1.8 },
      { crop: "Maize", pricePerKg: 17, change: 0.3 }, { crop: "Sugarcane", pricePerKg: 3.6, change: 0.9 },
      { crop: "Tomato", pricePerKg: 40, change: 6.7 }, { crop: "Onion", pricePerKg: 26, change: -1.4 },
      { crop: "Wheat", pricePerKg: 22, change: -0.3 }, { crop: "Soybean", pricePerKg: 46, change: 2.3 },
      { crop: "Potato", pricePerKg: 17, change: 1.8 }, { crop: "Mustard", pricePerKg: 53, change: -0.6 },
    ]
  },
];

const distanceFilters = [
  { key: "all", labelKey: "market.allMarkets" },
  { key: "10", labelKey: "market.within10" },
  { key: "25", labelKey: "market.within25" },
  { key: "50", labelKey: "market.within50" },
];

const categoryKeys = [
  { key: "All", labelKey: "market.all" },
  { key: "Grains", labelKey: "market.grains" },
  { key: "Vegetables", labelKey: "market.vegetables" },
  { key: "Cash Crops", labelKey: "market.cashCrops" },
  { key: "Spices", labelKey: "market.spices" },
];

const grains = ["Rice", "Wheat", "Maize", "Soybean"];
const vegetables = ["Tomato", "Onion", "Potato"];
const cashCrops = ["Cotton", "Sugarcane"];

export default function Market() {
  const { language } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [distanceFilter, setDistanceFilter] = useState("all");
  const [unitPerKg, setUnitPerKg] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [priceFluctuation, setPriceFluctuation] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  // Simulate price updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceFluctuation(prev => prev + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const getFluctuatedPrice = (base: number) => {
    const fluctuation = (Math.sin(priceFluctuation * 0.5 + base) * 0.02) * base;
    return Math.round((base + fluctuation) * 100) / 100;
  };

  const filteredMarkets = NEARBY_MARKETS.filter(m => {
    if (distanceFilter === "all") return true;
    return m.distance <= parseInt(distanceFilter);
  });

  const filterCrops = (crops: MarketData["crops"]) => {
    return crops.filter(c => {
      const matchSearch = c.crop.toLowerCase().includes(search.toLowerCase());
      if (activeCategory === "All") return matchSearch;
      if (activeCategory === "Grains") return matchSearch && grains.includes(c.crop);
      if (activeCategory === "Vegetables") return matchSearch && vegetables.includes(c.crop);
      if (activeCategory === "Cash Crops") return matchSearch && cashCrops.includes(c.crop);
      return matchSearch;
    });
  };

  const chartData = Array.from({ length: 7 }, (_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    price: 25 + (Math.random() - 0.5) * 10 + priceFluctuation * 0.1,
  }));

  return (
    <Layout>
      <div className="px-5 pt-6 pb-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{tr("market.title", language)}</h1>
            <p className="text-sm text-muted-foreground mt-1">{tr("market.subtitle", language)}</p>
          </div>
          <button onClick={() => setUnitPerKg(!unitPerKg)}
            className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {unitPerKg ? tr("market.perKg", language) : tr("market.perQuintal", language)}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={tr("market.searchCrops", language)} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-12 rounded-xl" />
        </div>

        {/* Distance Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {distanceFilters.map((f) => (
            <button key={f.key} onClick={() => setDistanceFilter(f.key)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                distanceFilter === f.key ? "bg-info text-info-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {tr(f.labelKey, language)}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categoryKeys.map((cat) => (
            <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {tr(cat.labelKey, language)}
            </button>
          ))}
        </div>

        {/* Update indicator */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className="h-3 w-3 animate-spin" style={{ animationDuration: "3s" }} />
          {tr("market.updatedAgo", language)}
        </div>

        {loading ? (
          <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}</div>
        ) : (
          <div className="space-y-6">
            {filteredMarkets.map((market, mi) => {
              const crops = filterCrops(market.crops);
              if (crops.length === 0) return null;
              return (
                <motion.div key={mi} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: mi * 0.1 }}>
                  {/* Market Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-foreground">{market.name}</h3>
                      <p className="text-[10px] text-muted-foreground">{market.distance} {tr("market.km", language)}</p>
                    </div>
                  </div>

                  {/* Crops Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {crops.map((c, ci) => {
                      const displayPrice = getFluctuatedPrice(unitPerKg ? c.pricePerKg : c.pricePerKg * 100);
                      return (
                        <motion.div
                          key={ci}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: ci * 0.03 }}
                          className="bg-card rounded-2xl border border-border shadow-card p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{CROP_EMOJIS[c.crop] || "🌿"}</span>
                            <Bell className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <p className="font-display text-sm font-bold text-foreground">{c.crop}</p>
                          <p className="font-display text-xl font-bold text-foreground mt-1">₹{displayPrice.toFixed(unitPerKg ? 0 : 0)}</p>
                          <p className="text-[10px] text-muted-foreground">{unitPerKg ? tr("market.perKg", language) : tr("market.perQuintal", language)}</p>
                          <div className={`flex items-center gap-1 text-xs font-semibold mt-1 ${
                            c.change > 0 ? "text-success" : c.change < 0 ? "text-destructive" : "text-muted-foreground"
                          }`}>
                            {c.change > 0 ? <TrendingUp className="h-3 w-3" /> : c.change < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                            {Math.abs(c.change)}%
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
