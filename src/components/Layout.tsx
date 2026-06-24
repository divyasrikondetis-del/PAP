import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, ScanLine, ShoppingCart, Wrench, Phone, ArrowLeft, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage, LANGUAGES } from "@/contexts/LanguageContext";
import { tr } from "@/lib/translations";
import { useState } from "react";

const navItems = [
  { to: "/dashboard", labelKey: "nav.home", icon: Home },
  { to: "/scanner", labelKey: "nav.scan", icon: ScanLine },
  { to: "/market", labelKey: "nav.market", icon: ShoppingCart },
  { to: "/equipment", labelKey: "nav.equip", icon: Wrench },
  { to: "/contacts", labelKey: "nav.contacts", icon: Phone },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [showLangPicker, setShowLangPicker] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="mx-auto max-w-lg flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Back always goes home */}
            <button onClick={() => navigate("/")} className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
              <ArrowLeft className="h-4 w-4 text-foreground" />
            </button>
            <button onClick={() => navigate("/dashboard")} className="p-2 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
              <Home className="h-4 w-4 text-primary" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setShowLangPicker(!showLangPicker)} className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
              <Globe className="h-4 w-4 text-foreground" />
            </button>
            <button onClick={() => navigate("/")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 transition-all border border-primary/20">
              <span className="text-xs font-bold text-primary font-display whitespace-nowrap">PAP</span>
            </button>
          </div>
        </div>

        {/* Language dropdown */}
        {showLangPicker && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="absolute right-4 top-full mt-1 bg-card rounded-xl border border-border shadow-elevated p-2 z-50"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setShowLangPicker(false); }}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  language === lang.code ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      <main className="pt-14">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="relative flex flex-col items-center px-3 py-2"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-1 h-1 w-8 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon
                  className={`h-5 w-5 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`mt-0.5 text-[10px] font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {tr(item.labelKey, language)}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}