"use client";

import { socialLinks } from "@/data/portfolio";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative border-t border-[#111b30] bg-[#050810] overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div
        className="aurora-blob animate-float-slow"
        style={{ width: 500, height: 500, background: "#0ea5e9", bottom: "-60%", right: "10%", opacity: 0.15 }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.5em] text-[#38bdf8] uppercase mb-4 font-mono">
            {t("cta.eyebrow")}
          </p>
          <Link href="/contact" className="inline-block group">
            <h2 className="text-display font-display font-light tracking-[0.06em] gradient-text-shimmer italic">
              {t("footer.getInTouch")}
            </h2>
          </Link>
        </motion.div>

        <div className="flex flex-col items-center gap-10 pt-10 border-t border-[#111b30]">
          <div className="flex flex-col items-center gap-2">
            <Link href="/" className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
              <span className="text-lg sm:text-xl font-display font-light tracking-[0.3em] gradient-text pl-[0.3em]">
                BADR
              </span>
            </Link>
            <p className="text-xs text-[#5a6b8a] tracking-[0.1em] mt-2 font-body text-center">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52V6.94a4.84 4.84 0 01-1-.25z" />
              </svg>
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[#111b30] flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-[11px] text-[#3a4a68] tracking-[0.1em] font-mono">
            &copy; {new Date().getFullYear()} {t("footer.rights")}
          </p>
          <span className="hidden md:block text-[#3a4a68] text-[11px] font-mono">•</span>
          <p className="text-[11px] text-[#3a4a68] tracking-[0.1em] font-mono">
            {t("footer.crafted")}
          </p>
        </div>
      </div>
    </footer>
  );
}
