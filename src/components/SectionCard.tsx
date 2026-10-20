"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Section, getVideoThumbnailUrl } from "@/data/portfolio";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

interface SectionCardProps {
  section: Section;
  index: number;
}

export default function SectionCard({ section, index }: SectionCardProps) {
  const [imgError, setImgError] = useState(false);
  const { t, sectionTitle, sectionCategory, sectionDescription } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/portfolio#section-${section.id}`}>
        <div className="group relative overflow-hidden rounded-2xl bg-[#0c1322] border border-[#18243d] cursor-pointer transition-all duration-500 hover:border-[#38bdf8]/30 hover:shadow-[0_30px_70px_-15px_rgba(56,189,248,0.2)]">
          <div className="aspect-[4/5] relative overflow-hidden">
            {!imgError ? (
              <img
                src={getVideoThumbnailUrl(section.coverVideo)}
                alt={section.title}
                className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  if (!el.dataset.retried) {
                    el.dataset.retried = "1";
                    el.src = getVideoThumbnailUrl(section.coverVideo, "hqdefault");
                  } else {
                    setImgError(true);
                  }
                }}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#111b30] to-[#050810] flex items-center justify-center relative overflow-hidden">
                <div className="grid-bg absolute inset-0 opacity-40" />
                <motion.span
                  className="text-[#38bdf8] text-7xl sm:text-8xl font-display font-light italic opacity-20 relative z-10"
                  animate={{ opacity: [0.15, 0.28, 0.15] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {String(section.id).padStart(2, "0")}
                </motion.span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/30 to-transparent" />
          </div>

          <div className="absolute top-4 right-4 z-10">
            <span className="text-[10px] font-mono text-[#38bdf8] tracking-[0.2em] px-2.5 py-1 rounded-full border border-[#38bdf8]/20 bg-[#050810]/50 backdrop-blur-sm">
              {String(section.id).padStart(2, "0")}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 text-center">
            <p className="text-[10px] text-[#38bdf8] tracking-[0.3em] uppercase mb-2 font-mono">
              {sectionCategory(section.id)}
            </p>
            <h3 className="text-xl sm:text-2xl font-display font-light mb-1 text-white tracking-wide">{sectionTitle(section.id)}</h3>

            <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-24">
              <p className="text-xs sm:text-sm text-[#8395b8] mt-3 leading-relaxed font-body">
                {sectionDescription(section.id)}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-[#38bdf8] text-[10px] tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 font-mono">
              <span>{t("sectionCard.viewProject")}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="rtl:rotate-180">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
