import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export const LANGUAGES = [
  { code: "en", label: "English", font: "'DM Sans', sans-serif" },
  { code: "te", label: "తెలుగు", font: "'Noto Sans Telugu', 'DM Sans', sans-serif" },
  { code: "hi", label: "हिन्दी", font: "'Noto Sans Devanagari', 'DM Sans', sans-serif" },
  { code: "ta", label: "தமிழ்", font: "'Noto Sans Tamil', 'DM Sans', sans-serif" },
  { code: "kn", label: "ಕನ್ನಡ", font: "'Noto Sans Kannada', 'DM Sans', sans-serif" },
];

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  font: string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  font: "'DM Sans', sans-serif",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState(() => localStorage.getItem("pap_lang") || "en");

  const setLanguage = (lang: string) => {
    setLang(lang);
    localStorage.setItem("pap_lang", lang);
  };

  const font = LANGUAGES.find((l) => l.code === language)?.font || "'DM Sans', sans-serif";

  useEffect(() => {
    document.body.style.fontFamily = font;
  }, [font]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, font }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
