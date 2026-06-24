import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Phone as PhoneIcon, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/LoadingSkeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { tr } from "@/lib/translations";
import { getNearbyEquipment, Equipment, MOCK_EQUIPMENT } from "@/lib/api";

const EQUIP_EMOJIS: Record<string, string> = {
  Tractor: "🚜", Harvester: "🌾", Pump: "💧", Sprayer: "🔫", Tiller: "⚙️", Others: "🔧",
};

const typeFilters = ["All", "Tractor", "Harvester", "Pump", "Sprayer", "Tiller", "Others"];

export default function EquipmentPage() {
  const { language } = useLanguage();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [selectedEquip, setSelectedEquip] = useState<Equipment | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingDays, setBookingDays] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const data = await getNearbyEquipment(28.6139, 77.209);
        setEquipment(data.length > 0 ? data : MOCK_EQUIPMENT);
      } catch { setEquipment(MOCK_EQUIPMENT); }
      finally { setLoading(false); }
    })();
  }, []);

  const filtered = equipment.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    if (activeType === "All") return matchSearch;
    return matchSearch && e.type === activeType;
  });

  return (
    <Layout>
      <div className="px-5 pt-6 pb-6 space-y-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{tr("equip.title", language)}</h1>
          <p className="text-sm text-muted-foreground mt-1">{tr("equip.subtitle", language)}</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={tr("equip.search", language)} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-12 rounded-xl" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {typeFilters.map((t) => (
            <button key={t} onClick={() => setActiveType(t)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeType === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >{EQUIP_EMOJIS[t] || "📋"} {t}</button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((eq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                      {EQUIP_EMOJIS[eq.type || "Others"] || "🔧"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm font-bold text-foreground truncate">{eq.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-0.5 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {eq.distance} km</span>
                        {eq.rating && <span className="flex items-center gap-0.5 text-xs text-warning"><Star className="h-3 w-3 fill-warning" /> {eq.rating}</span>}
                      </div>
                      {eq.owner && <p className="text-xs text-muted-foreground mt-1">by {eq.owner}</p>}
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-bold text-primary">₹{eq.price}</p>
                      <p className="text-[10px] text-muted-foreground">{tr("equip.perDay", language)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => { setSelectedEquip(eq); setShowBooking(false); }}>
                      {tr("equip.details", language)}
                    </Button>
                    <Button size="sm" className="flex-1 rounded-xl" disabled={!eq.available}
                      onClick={() => { setSelectedEquip(eq); setShowBooking(true); }}
                    >
                      {eq.available ? tr("equip.bookNow", language) : tr("equip.unavailable", language)}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedEquip && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-foreground/50 flex items-end"
            onClick={() => setSelectedEquip(null)}
          >
            <motion.div initial={{ y: 300 }} animate={{ y: 0 }}
              className="w-full bg-card rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />
              <h2 className="font-display text-lg font-bold text-foreground">{selectedEquip.name}</h2>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {selectedEquip.distance} km</span>
                {selectedEquip.rating && <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" /> {selectedEquip.rating}</span>}
              </div>

              {showBooking ? (
                <div className="mt-6 space-y-4">
                  <h3 className="font-display text-sm font-bold text-foreground">{tr("equip.bookEquip", language)}</h3>
                  <div className="flex items-center justify-between bg-muted rounded-xl p-4">
                    <span className="text-sm text-foreground">{tr("equip.days", language)}</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setBookingDays(Math.max(1, bookingDays - 1))} className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-foreground">-</button>
                      <span className="font-display text-lg font-bold text-foreground w-8 text-center">{bookingDays}</span>
                      <button onClick={() => setBookingDays(bookingDays + 1)} className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-foreground">+</button>
                    </div>
                  </div>
                  <div className="bg-muted rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Base price</span><span className="text-foreground">₹{selectedEquip.price} × {bookingDays}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery</span><span className="text-foreground">₹200</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">GST (18%)</span><span className="text-foreground">₹{Math.round((selectedEquip.price * bookingDays + 200) * 0.18)}</span></div>
                    <div className="border-t border-border pt-2 flex justify-between font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="font-display text-primary">₹{Math.round((selectedEquip.price * bookingDays + 200) * 1.18)}</span>
                    </div>
                  </div>
                  <Button className="w-full h-14 rounded-2xl text-base font-semibold">{tr("equip.confirm", language)}</Button>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  <p className="text-sm text-foreground">Owner: <span className="font-medium">{selectedEquip.owner}</span></p>
                  <p className="font-display text-2xl font-bold text-primary">₹{selectedEquip.price}<span className="text-sm text-muted-foreground font-normal">{tr("equip.perDay", language)}</span></p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-xl"><PhoneIcon className="h-4 w-4 mr-1" /> {tr("equip.call", language)}</Button>
                    <Button variant="outline" className="flex-1 rounded-xl"><MessageCircle className="h-4 w-4 mr-1" /> {tr("equip.chat", language)}</Button>
                    <Button className="flex-1 rounded-xl" onClick={() => setShowBooking(true)}>{tr("equip.book", language)}</Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
