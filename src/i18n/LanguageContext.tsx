"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  translations,
  sectionsI18n,
  categoryName,
  type Lang,
  type TranslationKey,
} from "./translations";

interface LangContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  isRtl: boolean;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
  sectionTitle: (id: number) => string;
  sectionCategory: (id: number) => string;
  sectionDescription: (id: number) => string;
  category: (name: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "badr-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    const isAr = lang === "ar";
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.classList.toggle("lang-ar", isAr);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggleLang = () =>
    setLangState((prev) => (prev === "en" ? "ar" : "en"));

  const t = (key: TranslationKey) => translations[key][lang];

  const sectionTitle = (id: number) => sectionsI18n[id]?.title[lang] ?? "";
  const sectionCategory = (id: number) => sectionsI18n[id]?.category[lang] ?? "";
  const sectionDescription = (id: number) =>
    sectionsI18n[id]?.description[lang] ?? "";

  const category = (name: string) => categoryName(name, lang);

  return (
    <LangContext.Provider
      value={{
        lang,
        dir: lang === "ar" ? "rtl" : "ltr",
        isRtl: lang === "ar",
        setLang,
        toggleLang,
        t,
        sectionTitle,
        sectionCategory,
        sectionDescription,
        category,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
