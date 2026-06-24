import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone as PhoneIcon, ChevronRight, ChevronDown, MapPin, MessageCircle, Clock, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { tr } from "@/lib/translations";

type Tab = "medical" | "advisory" | "experts" | "vet" | "helplines";

const FIRST_AID = [
  {
    title: "Heat Stroke", emoji: "☀️",
    symptoms: ["High body temperature (>104°F)", "Hot, red, dry skin", "Rapid pulse", "Headache, dizziness", "Nausea or vomiting"],
    steps: ["Move person to shade immediately", "Remove excess clothing", "Apply cool water or wet towels to skin", "Fan the person while wetting skin", "Give cool water if conscious", "Call 108 immediately"],
    doctorPhone: "108"
  },
  {
    title: "Pesticide Poisoning", emoji: "☠️",
    symptoms: ["Nausea, vomiting, diarrhea", "Excessive sweating", "Blurred vision", "Difficulty breathing", "Dizziness, confusion"],
    steps: ["Remove person from contaminated area", "Remove contaminated clothing carefully", "Wash skin thoroughly with soap and water", "Do NOT induce vomiting", "Keep person calm and still", "Call 108 or Poison Control immediately"],
    doctorPhone: "108"
  },
  {
    title: "Snake Bite", emoji: "🐍",
    symptoms: ["Puncture marks on skin", "Swelling around bite", "Severe pain or numbness", "Nausea, difficulty breathing"],
    steps: ["Keep person calm and still", "Immobilize the bitten limb below heart level", "Remove rings, watches near bite", "Do NOT apply tourniquet or ice", "Do NOT cut wound or suck venom", "Rush to nearest hospital immediately"],
    doctorPhone: "108"
  },
  {
    title: "Insect Stings", emoji: "🐝",
    symptoms: ["Sharp pain at sting site", "Redness and swelling", "Itching or hives", "Difficulty breathing (allergic reaction)"],
    steps: ["Remove stinger by scraping with flat edge", "Wash with soap and water", "Apply ice pack for 10 minutes", "Take antihistamine if available", "If difficulty breathing: Call 108 immediately"],
    doctorPhone: "108"
  },
  {
    title: "Tool Injuries", emoji: "🔧",
    symptoms: ["Bleeding wound", "Swelling, bruising", "Difficulty moving affected area", "Visible bone or deep cut"],
    steps: ["Apply firm pressure with clean cloth", "Elevate injured area above heart", "Do NOT remove embedded objects", "Clean minor wounds with water", "Apply sterile bandage", "Seek medical help for deep cuts"],
    doctorPhone: "108"
  },
  {
    title: "Dehydration", emoji: "💧",
    symptoms: ["Extreme thirst", "Dark yellow urine", "Dizziness, fatigue", "Dry mouth and lips", "Rapid heartbeat"],
    steps: ["Move to cool, shaded area", "Give small sips of water frequently", "Add ORS or salt+sugar water", "Loosen tight clothing", "Apply cool cloth to forehead", "Rest for at least 30 minutes"],
    doctorPhone: "108"
  },
];

const CROP_ADVISORS = [
  { crop: "Rice", name: "Dr. Ramesh Babu", phone: "9876543210", district: "Guntur", hours: "9AM-5PM", expertise: "Paddy diseases & pest management" },
  { crop: "Rice", name: "Sri. Venkat Rao", phone: "9876543211", district: "East Godavari", hours: "10AM-6PM", expertise: "Rice blast & BPH control" },
  { crop: "Wheat", name: "Dr. Suresh Kumar", phone: "9876543212", district: "Karnal", hours: "9AM-5PM", expertise: "Wheat rust & nutrient management" },
  { crop: "Wheat", name: "Dr. Priya Sharma", phone: "9876543213", district: "Ludhiana", hours: "8AM-4PM", expertise: "Wheat varieties & irrigation" },
  { crop: "Cotton", name: "Dr. Anil Patil", phone: "9876543214", district: "Nagpur", hours: "9AM-6PM", expertise: "Bollworm management & BT Cotton" },
  { crop: "Cotton", name: "Sri. Rajesh Patel", phone: "9876543215", district: "Rajkot", hours: "10AM-5PM", expertise: "Cotton fiber quality & ginning" },
  { crop: "Sugarcane", name: "Dr. Manoj Singh", phone: "9876543216", district: "Kolhapur", hours: "8AM-5PM", expertise: "Sugarcane borers & ratoon management" },
  { crop: "Vegetables", name: "Dr. Lakshmi Devi", phone: "9876543217", district: "Kurnool", hours: "9AM-5PM", expertise: "Tomato, chilli disease management" },
  { crop: "Vegetables", name: "Dr. Kavitha M", phone: "9876543218", district: "Bangalore Rural", hours: "10AM-6PM", expertise: "Organic vegetable farming" },
];

const NEARBY_EXPERTS = [
  { name: "Agricultural Extension Officer", person: "Sri. Krishna Murthy", phone: "9876500001", distance: 8, whatsapp: "919876500001" },
  { name: "Plant Protection Officer", person: "Dr. Swathi Reddy", phone: "9876500002", distance: 12, whatsapp: "919876500002" },
  { name: "Soil Testing Lab", person: "District Soil Lab", phone: "9876500003", distance: 15, whatsapp: "919876500003" },
  { name: "Seed Distributor", person: "Sri. Mahesh Seeds", phone: "9876500004", distance: 5, whatsapp: "919876500004" },
  { name: "Fertilizer Dealer", person: "Agri Care Center", phone: "9876500005", distance: 3, whatsapp: "919876500005" },
  { name: "Krishi Vigyan Kendra", person: "KVK Officer", phone: "9876500006", distance: 22, whatsapp: "919876500006" },
];

const VET_CONTACTS = [
  { name: "District Veterinary Hospital", phone: "1962", type: "Emergency", available: "24/7" },
  { name: "Dr. Ravi Kumar - Cattle Specialist", phone: "9876600001", type: "Cattle", available: "8AM-8PM" },
  { name: "Dr. Anjali - Poultry Expert", phone: "9876600002", type: "Poultry", available: "9AM-6PM" },
  { name: "Mobile Vet Unit", phone: "9876600003", type: "All Animals", available: "10AM-4PM" },
  { name: "Animal Husbandry Dept", phone: "1800-180-1551", type: "Government", available: "9AM-5PM" },
];

const GOV_HELPLINES = [
  { name: "Kisan Call Center", phone: "1800-180-1551", desc: "Free farming advice in local language", toll: true },
  { name: "Soil Health Card", phone: "1800-180-5656", desc: "Soil testing & fertility information", toll: true },
  { name: "Crop Insurance (PMFBY)", phone: "1800-180-1553", desc: "Pradhan Mantri Fasal Bima Yojana", toll: true },
  { name: "Seed Certification", phone: "1800-180-1552", desc: "Quality seed verification", toll: true },
  { name: "PM-KISAN Helpline", phone: "155261", desc: "Direct benefit transfer queries", toll: false },
  { name: "Agriculture Emergency", phone: "1800-180-1104", desc: "Disaster & crop loss reporting", toll: true },
];

const TABS: { key: Tab; labelKey: string }[] = [
  { key: "medical", labelKey: "contacts.medicalFirst" },
  { key: "advisory", labelKey: "contacts.cropAdvisory" },
  { key: "experts", labelKey: "contacts.nearbyExperts" },
  { key: "vet", labelKey: "contacts.vetContacts" },
  { key: "helplines", labelKey: "contacts.govHelplines" },
];

export default function Contacts() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("medical");
  const [expandedGuide, setExpandedGuide] = useState<number | null>(null);
  const [cropFilter, setCropFilter] = useState("All");

  const cropTypes = ["All", ...Array.from(new Set(CROP_ADVISORS.map(a => a.crop)))];
  const filteredAdvisors = cropFilter === "All" ? CROP_ADVISORS : CROP_ADVISORS.filter(a => a.crop === cropFilter);

  return (
    <Layout>
      <div className="px-5 pt-6 pb-6 space-y-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{tr("contacts.title", language)}</h1>
          <p className="text-sm text-muted-foreground mt-1">{tr("contacts.subtitle", language)}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tr(tab.labelKey, language)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* MEDICAL FIRST AID */}
          {activeTab === "medical" && (
            <motion.div key="medical" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {FIRST_AID.map((guide, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
                  <button onClick={() => setExpandedGuide(expandedGuide === i ? null : i)}
                    className="w-full flex items-center gap-3 p-4"
                  >
                    <span className="text-2xl">{guide.emoji}</span>
                    <span className="flex-1 text-sm font-semibold text-foreground text-left">{guide.title}</span>
                    {expandedGuide === i ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                  </button>
                  {expandedGuide === i && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pb-4 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-destructive uppercase mb-2">{tr("contacts.symptoms", language)}</h4>
                        <ul className="space-y-1">
                          {guide.symptoms.map((s, j) => (
                            <li key={j} className="text-sm text-foreground flex items-start gap-2">
                              <span className="text-destructive mt-1">•</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-success uppercase mb-2">{tr("contacts.immediateSteps", language)}</h4>
                        <ol className="space-y-1.5">
                          {guide.steps.map((s, j) => (
                            <li key={j} className="text-sm text-foreground flex items-start gap-2">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-success/10 text-success text-xs font-bold flex items-center justify-center mt-0.5">{j + 1}</span>
                              {s}
                            </li>
                          ))}
                        </ol>
                      </div>
                      <a href={`tel:${guide.doctorPhone}`} className="block">
                        <Button className="w-full rounded-xl bg-destructive hover:bg-destructive/90">
                          <PhoneIcon className="h-4 w-4 mr-2" /> {tr("contacts.callDoctor", language)} ({guide.doctorPhone})
                        </Button>
                      </a>
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* CROP ADVISORY */}
          {activeTab === "advisory" && (
            <motion.div key="advisory" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {cropTypes.map((crop) => (
                  <button key={crop} onClick={() => setCropFilter(crop)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      cropFilter === crop ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {filteredAdvisors.map((advisor, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-2xl border border-border shadow-card p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg font-bold text-primary">
                        {advisor.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-foreground">{advisor.name}</h3>
                        <p className="text-xs text-muted-foreground">{advisor.expertise}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{advisor.district}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{advisor.hours}</span>
                        </div>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground text-[10px] font-medium">{advisor.crop}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <a href={`tel:${advisor.phone}`} className="flex-1">
                        <Button size="sm" className="w-full rounded-xl text-xs">
                          <PhoneIcon className="h-3 w-3 mr-1" /> {tr("contacts.callNow", language)}
                        </Button>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* NEARBY EXPERTS */}
          {activeTab === "experts" && (
            <motion.div key="experts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {NEARBY_EXPERTS.map((expert, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl border border-border shadow-card p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{expert.name}</h3>
                      <p className="text-xs text-muted-foreground">{expert.person}</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      <MapPin className="h-3 w-3" /> {expert.distance} km
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <a href={`tel:${expert.phone}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full rounded-xl text-xs">
                        <PhoneIcon className="h-3 w-3 mr-1" /> {tr("contacts.callNow", language)}
                      </Button>
                    </a>
                    <a href={`https://wa.me/${expert.whatsapp}`} target="_blank" rel="noopener" className="flex-1">
                      <Button size="sm" className="w-full rounded-xl text-xs bg-success hover:bg-success/90">
                        <MessageCircle className="h-3 w-3 mr-1" /> {tr("contacts.whatsapp", language)}
                      </Button>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* VETERINARY */}
          {activeTab === "vet" && (
            <motion.div key="vet" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {VET_CONTACTS.map((vet, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl border border-border shadow-card p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-lg">🐄</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground">{vet.name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="px-2 py-0.5 rounded-full bg-muted">{vet.type}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{vet.available}</span>
                      </div>
                    </div>
                  </div>
                  <a href={`tel:${vet.phone}`}>
                    <Button size="sm" className="w-full mt-3 rounded-xl">
                      <PhoneIcon className="h-3 w-3 mr-1" /> {vet.phone}
                    </Button>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* GOVERNMENT HELPLINES */}
          {activeTab === "helplines" && (
            <motion.div key="helplines" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {GOV_HELPLINES.map((helpline, i) => (
                <motion.a
                  key={i}
                  href={`tel:${helpline.phone}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block bg-card rounded-2xl border border-border shadow-card p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
                      <PhoneIcon className="h-5 w-5 text-info" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground">{helpline.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{helpline.desc}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-display text-sm font-bold text-primary">{helpline.phone}</span>
                        {helpline.toll && <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">Toll Free</span>}
                      </div>
                    </div>
                    <PhoneIcon className="h-5 w-5 text-success flex-shrink-0 mt-1" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
