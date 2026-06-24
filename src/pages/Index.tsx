import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
  ScanLine, TrendingUp, Wrench, Shield,
  ArrowRight, Globe, Leaf, Cloud, Droplets, Thermometer, Wind
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage, LANGUAGES } from "@/contexts/LanguageContext";
import { tr } from "@/lib/translations";
import { getWeather, WeatherData, MOCK_WEATHER } from "@/lib/api";
import heroFarm from "@/assets/hero-farm.jpg";

export default function Index() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeather = useCallback(async () => {
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
      ).catch(() => null);
      const lat = pos?.coords.latitude ?? 28.6139;
      const lon = pos?.coords.longitude ?? 77.209;
      const w = await getWeather(lat, lon).catch(() => MOCK_WEATHER);
      setWeather(w);
    } catch {
      setWeather(MOCK_WEATHER);
    }
  }, []);

  useEffect(() => { fetchWeather(); }, [fetchWeather]);

  const features = [
    { icon: ScanLine, title: tr("feat.cropDetection", language), desc: tr("feat.cropDetectionDesc", language), badge: "AI", color: "from-emerald-500 to-teal-600", to: "/scanner" },
    { icon: TrendingUp, title: tr("feat.realtimePrices", language), desc: tr("feat.realtimePricesDesc", language), color: "from-amber-500 to-orange-600", to: "/market" },
    { icon: Wrench, title: tr("feat.equipRental", language), desc: tr("feat.equipRentalDesc", language), color: "from-sky-500 to-blue-600", to: "/equipment" },
    { icon: Shield, title: tr("feat.helpSupport", language), desc: tr("feat.helpSupportDesc", language), color: "from-rose-500 to-red-600", to: "/contacts" },
  ];

  const stats = [
    { value: "10,000+", label: tr("stat.farmers", language) },
    { value: "25+", label: tr("stat.crops", language) },
    { value: "98%", label: tr("stat.accuracy", language) },
    { value: "100+", label: tr("stat.diseases", language) },
  ];

  const steps = [
    { step: "1", title: tr("how.step1", language), desc: tr("how.step1Desc", language), emoji: "📸" },
    { step: "2", title: tr("how.step2", language), desc: tr("how.step2Desc", language), emoji: "🤖" },
    { step: "3", title: tr("how.step3", language), desc: tr("how.step3Desc", language), emoji: "✅" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroFarm} alt="Lush green farmland" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-primary/80" />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {["🌾", "🍃", "☀️", "🌱", "💧", "🌿", "🍀", "🌻"].map((emoji, i) => (
            <motion.div key={i} className="absolute text-3xl opacity-30"
              style={{ left: `${8 + i * 12}%`, top: `${10 + (i % 4) * 22}%` }}
              animate={{ y: [-20, 20, -20], rotate: [-8, 8, -8] }}
              transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
            >{emoji}</motion.div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div className="mb-6" animate={{ y: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity }}>
              <div className="mx-auto w-28 h-28 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-glow border border-white/30">
                <Leaf className="h-16 w-16 text-white" />
              </div>
            </motion.div>

            <h1 className="font-display text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">
              {tr("home.title", language)}
            </h1>
            <p className="text-lg font-semibold text-white/90 mb-1">{tr("home.usingAI", language)}</p>
            <p className="text-sm text-white/70 mb-2">{tr("home.subtitle", language)}</p>
            <p className="text-sm text-white/60 mb-8 max-w-xs mx-auto">{tr("home.desc", language)}</p>

            {/* Language Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Globe className="h-4 w-4 text-white/70" />
                <span className="text-sm text-white/70">{tr("home.chooseLang", language)}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {LANGUAGES.map((lang) => (
                  <button key={lang.code} onClick={() => setLanguage(lang.code)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      language === lang.code
                        ? "bg-white text-primary shadow-elevated scale-105"
                        : "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm"
                    }`}
                  >{lang.label}</button>
                ))}
              </div>
            </div>

            <Button size="lg"
              className="w-full max-w-xs bg-white text-primary font-bold shadow-elevated hover:bg-white/90 text-lg h-16 rounded-2xl"
              onClick={() => navigate("/dashboard")}
            >
              {tr("home.explore", language)} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-4 text-sm text-white/60">{tr("home.free", language)}</p>
          </motion.div>
        </div>
      </section>

      {/* Weather */}
      {weather && (
        <section className="py-8 px-6 bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-950 dark:to-emerald-950">
          <div className="max-w-lg mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-gradient-to-br from-sky-400 to-blue-600 rounded-3xl p-6 text-white shadow-elevated"
            >
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="h-5 w-5" />
                <h3 className="font-display text-sm font-bold">{tr("home.weather", language)}</h3>
                <span className="text-xs opacity-70 ml-auto">{tr("home.yourLocation", language)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-6 w-6" />
                    <span className="font-display text-5xl font-extrabold">{weather.temp}°C</span>
                  </div>
                  <p className="text-sm opacity-80 mt-1">{weather.condition}</p>
                </div>
                <div className="text-right space-y-2">
                  <div className="flex items-center gap-1.5 text-sm opacity-80"><Droplets className="h-4 w-4" /> {weather.humidity}%</div>
                  <div className="flex items-center gap-1.5 text-sm opacity-80"><Wind className="h-4 w-4" /> 12 km/h</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16 px-6 bg-gradient-to-b from-background via-emerald-50/50 to-background dark:via-emerald-950/20">
        <div className="max-w-lg mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-3">{tr("home.whatWeOffer", language)}</h2>
          <p className="text-sm text-muted-foreground text-center mb-10">{tr("home.tapFeature", language)}</p>
          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.button key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate(f.to)}
                className={`relative bg-gradient-to-br ${f.color} rounded-2xl p-5 shadow-elevated text-white overflow-hidden text-left cursor-pointer hover:shadow-glow transition-shadow`}
              >
                <div className="absolute -right-3 -bottom-3 opacity-10"><f.icon className="h-20 w-20" /></div>
                {f.badge && <span className="absolute top-3 right-3 bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">{f.badge}</span>}
                <f.icon className="h-8 w-8 mb-3" />
                <h3 className="font-display text-sm font-bold">{f.title}</h3>
                <p className="text-xs opacity-80 mt-1">{f.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold opacity-90">{tr("home.open", language)} <ArrowRight className="h-3 w-3" /></div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 gradient-sunset">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-10">{tr("home.howItWorks", language)}</h2>
          <div className="flex flex-col gap-5">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="flex items-center gap-4 bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-left border border-white/10"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">{s.emoji}</div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white">Step {s.step}: {s.title}</h3>
                  <p className="text-xs text-white/70 mt-0.5">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-6 gradient-sky">
        <div className="max-w-lg mx-auto grid grid-cols-4 gap-3 text-center">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="font-display text-2xl font-extrabold text-white">{s.value}</div>
              <div className="text-xs text-white/70 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gradient-to-br from-emerald-900 to-teal-900">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="h-5 w-5 text-emerald-300" />
            <span className="font-display text-lg font-bold text-white">CropDetectionUsingAI</span>
          </div>
          <p className="text-xs text-white/50">{tr("home.subtitle", language)}</p>
          <p className="text-xs text-white/40 mt-3">© 2026 Made with ❤️ for farmers everywhere.</p>
        </div>
      </footer>
    </div>
  );
}
