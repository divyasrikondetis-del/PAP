import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Cloud, Droplets, Wind, ScanLine, ShoppingCart, Wrench,
  Phone, Bell, TrendingUp, TrendingDown, AlertTriangle, Info, ChevronRight, Thermometer, MapPin, Sun, Leaf
} from "lucide-react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { SkeletonCard } from "@/components/LoadingSkeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { tr } from "@/lib/translations";
import {
  getWeather, getPrices, WeatherData, CropPrice,
  MOCK_WEATHER, MOCK_PRICES, getScanHistory
} from "@/lib/api";

const FORECAST_DAYS = [
  { day: "Mon", icon: "☀️", high: 34, low: 24 },
  { day: "Tue", icon: "⛅", high: 33, low: 23 },
  { day: "Wed", icon: "🌧️", high: 30, low: 22 },
  { day: "Thu", icon: "🌤️", high: 32, low: 23 },
  { day: "Fri", icon: "☀️", high: 35, low: 25 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [prices, setPrices] = useState<CropPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [manualLocation, setManualLocation] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
      ).catch(() => null);

      if (!pos) {
        setLocationDenied(true);
      }

      const lat = pos?.coords.latitude ?? 28.6139;
      const lon = pos?.coords.longitude ?? 77.209;

      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const geoData = await geoRes.json();
        const addr = geoData.address;
        setLocationName(addr?.city || addr?.town || addr?.village || addr?.district || addr?.county || "Your Location");
      } catch {
        setLocationName("Your Location");
      }

      const [w, p] = await Promise.allSettled([getWeather(lat, lon), getPrices()]);
      setWeather(w.status === "fulfilled" ? w.value : MOCK_WEATHER);
      setPrices(p.status === "fulfilled" ? p.value : MOCK_PRICES);
    } catch {
      setWeather(MOCK_WEATHER);
      setPrices(MOCK_PRICES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const quickActions = [
    { icon: ScanLine, label: tr("dash.scanCrop", language), to: "/scanner", color: "gradient-hero", desc: "AI Disease Detection" },
    { icon: ShoppingCart, label: tr("nav.market", language), to: "/market", color: "gradient-sunset", desc: "Live Crop Prices" },
    { icon: Wrench, label: tr("nav.equip", language), to: "/equipment", color: "gradient-earth", desc: "Rent & Buy Tools" },
    { icon: Phone, label: tr("dash.emergency", language), to: "/contacts", color: "bg-destructive", desc: "24/7 Helpline" },
  ];

  const recentScans = getScanHistory().slice(0, 3);

  return (
    <Layout>
      {/* Hero Header */}
      <div className="gradient-hero px-6 pt-8 pb-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <p className="text-primary-foreground/70 text-base font-medium">{tr("dash.welcome", language)}</p>
            <h1 className="font-display text-3xl font-bold text-primary-foreground mt-1">{tr("dash.dashboard", language)}</h1>
          </div>
          <button className="relative p-3 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300">
            <Bell className="h-6 w-6 text-primary-foreground" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-warning rounded-full ring-2 ring-primary" />
          </button>
        </div>

        {/* Weather Widget */}
        {loading ? (
          <div className="bg-primary-foreground/10 rounded-3xl p-5"><SkeletonCard /></div>
        ) : weather && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="bg-primary-foreground/10 backdrop-blur-md rounded-3xl p-6 border border-primary-foreground/10 shadow-glow relative z-10"
          >
            {/* Location */}
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-primary-foreground/10">
                <MapPin className="h-4 w-4 text-primary-foreground/80" />
              </div>
              <span className="text-sm font-medium text-primary-foreground/90">
                {locationDenied && !manualLocation ? tr("dash.locationDenied", language) : (locationName || tr("home.yourLocation", language))}
              </span>
            </div>

            {locationDenied && !manualLocation && (
              <div className="mb-4">
                <Input
                  placeholder={tr("dash.enterLocation", language)}
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  className="h-12 text-base rounded-2xl bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary-foreground/10">
                    <Thermometer className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="font-display text-5xl font-extrabold text-primary-foreground tracking-tight">{weather.temp}°C</span>
                </div>
                <p className="text-base text-primary-foreground/80 mt-2 ml-1 font-medium">{weather.condition}</p>
              </div>
              <div className="text-right space-y-2">
                <div className="flex items-center justify-end gap-2 text-base text-primary-foreground/80">
                  <Droplets className="h-5 w-5" /> <span className="font-semibold">{weather.humidity}%</span>
                </div>
                <div className="flex items-center justify-end gap-2 text-base text-primary-foreground/80">
                  <Wind className="h-5 w-5" /> <span className="font-semibold">12 km/h</span>
                </div>
                <div className="flex items-center justify-end gap-2 text-base text-primary-foreground/80">
                  <Cloud className="h-5 w-5" /> <span className="font-semibold">{weather.condition}</span>
                </div>
              </div>
            </div>

            {/* 5-day forecast */}
            <div className="mt-5 pt-5 border-t border-primary-foreground/10">
              <p className="text-sm font-bold text-primary-foreground/70 mb-3 uppercase tracking-wider">{tr("dash.forecast", language)}</p>
              <div className="flex justify-between">
                {FORECAST_DAYS.map((d, i) => (
                  <div key={i} className="text-center p-2 rounded-xl hover:bg-primary-foreground/10 transition-colors duration-200">
                    <p className="text-xs font-semibold text-primary-foreground/60">{d.day}</p>
                    <p className="text-2xl my-1">{d.icon}</p>
                    <p className="text-sm text-primary-foreground font-bold">{d.high}°</p>
                    <p className="text-xs text-primary-foreground/50">{d.low}°</p>
                  </div>
                ))}
              </div>
            </div>

            {weather.alerts.length > 0 && (
              <div className="mt-4 bg-warning/20 rounded-2xl p-4 flex items-start gap-3 border border-warning/20">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <p className="text-sm text-primary-foreground font-medium">{weather.alerts[0].description}</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <motion.div
        variants={containerVariants} initial="hidden" animate="visible"
        className="px-6 -mt-5 space-y-7 pb-8"
      >
        {/* Price Ticker */}
        <motion.div variants={itemVariants}
          className="bg-card rounded-3xl shadow-elevated border border-border p-5 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold text-foreground">{tr("dash.livePrices", language)}</h3>
            <button onClick={() => navigate("/market")} className="text-sm text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200">
              {tr("dash.viewAll", language)} <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          {loading ? <SkeletonCard /> : (
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
              {prices.slice(0, 6).map((p, i) => (
                <motion.div key={i} whileHover={{ scale: 1.03 }} className="flex-shrink-0 min-w-[140px] bg-muted rounded-2xl p-4 border border-border/50 hover:shadow-card transition-shadow duration-300">
                  <p className="text-sm font-semibold text-foreground">{p.crop}</p>
                  <p className="font-display text-2xl font-bold text-foreground mt-1">₹{p.price}</p>
                  <div className={`flex items-center gap-1 text-sm font-semibold mt-1 ${p.change >= 0 ? "text-success" : "text-destructive"}`}>
                    {p.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {Math.abs(p.change)}%
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h3 className="font-display text-lg font-bold text-foreground mb-4">{tr("dash.quickActions", language)}</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((a, i) => (
              <motion.button key={i} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => navigate(a.to)}
                className={`${a.color} rounded-3xl p-6 text-left relative overflow-hidden group shadow-elevated`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary-foreground/5 rounded-full -translate-y-1/3 translate-x-1/3 group-hover:scale-150 transition-transform duration-500" />
                <div className="p-2.5 rounded-2xl bg-primary-foreground/15 w-fit mb-4">
                  <a.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="font-display text-base font-bold text-primary-foreground">{a.label}</p>
                <p className="text-xs text-primary-foreground/60 mt-1 font-medium">{a.desc}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Alerts */}
        {weather && weather.alerts.length > 0 && (
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-lg font-bold text-foreground mb-4">{tr("dash.alerts", language)}</h3>
            <div className="space-y-3">
              {weather.alerts.map((alert, i) => (
                <motion.div key={i} whileHover={{ scale: 1.01 }}
                  className={`rounded-2xl p-5 flex items-start gap-4 border shadow-card ${
                    alert.severity === "emergency" ? "bg-destructive/10 border-destructive/20" :
                    alert.severity === "warning" ? "bg-warning/10 border-warning/20" :
                    "bg-info/10 border-info/20"
                  }`}
                >
                  <div className={`p-2 rounded-xl ${alert.severity === "warning" ? "bg-warning/20" : "bg-info/20"}`}>
                    {alert.severity === "warning" ? <AlertTriangle className="h-5 w-5 text-warning" /> : <Info className="h-5 w-5 text-info" />}
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground">{alert.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Scans */}
        <motion.div variants={itemVariants}>
          <h3 className="font-display text-lg font-bold text-foreground mb-4">{tr("dash.recentScans", language)}</h3>
          {recentScans.length === 0 ? (
            <div className="bg-card rounded-3xl border border-border p-8 text-center shadow-card">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <p className="text-base text-muted-foreground font-medium">{tr("dash.noScans", language)}</p>
              <button onClick={() => navigate("/scanner")}
                className="mt-4 px-6 py-3 rounded-2xl gradient-hero text-primary-foreground font-bold text-base hover:shadow-glow transition-shadow duration-300"
              >
                {tr("dash.scanNow", language)}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <motion.div key={scan.id} whileHover={{ scale: 1.01 }}
                  className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4 shadow-card hover:shadow-elevated transition-shadow duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <ScanLine className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-foreground truncate">{scan.result.disease}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{new Date(scan.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-primary">{scan.result.confidence}%</span>
                    <p className="text-xs text-muted-foreground">match</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </Layout>
  );
}
