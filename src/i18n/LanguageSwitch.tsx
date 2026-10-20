"use client";

import { useLang } from "@/i18n/LanguageContext";

export default function LanguageSwitch() {
  const { lang, setLang } = useLang();

  const base =
    "px-3 py-1.5 rounded-full text-[11px] font-mono font-medium tracking-wide transition-all duration-300 cursor-pointer";
  const active = "bg-[#38bdf8] text-[#050810] shadow-[0_0_16px_rgba(56,189,248,0.4)]";
  const inactive = "text-[#7dd3fc] hover:bg-[#38bdf8]/10";

  return (
    <div className="flex items-center gap-1 rounded-full border border-[#38bdf8]/20 bg-[#0c1322]/70 backdrop-blur-sm p-1">
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        aria-label="العربية"
        className={`${base} ${lang === "ar" ? active : inactive}`}
      >
        ع
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        aria-label="English"
        className={`${base} ${lang === "en" ? active : inactive}`}
      >
        EN
      </button>
    </div>
  );
}
