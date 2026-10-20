"use client";

import { motion } from "framer-motion";
import { sections } from "@/data/portfolio";
import VideoCard from "@/components/VideoCard";
import { useLang } from "@/i18n/LanguageContext";

export default function Portfolio() {
  const { t, sectionTitle, sectionCategory, sectionDescription } = useLang();

  return (
    <div className="page-enter pt-20 sm:pt-24">
      {/* Hero */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div
          className="aurora-blob animate-float-slow"
          style={{ width: 400, height: 400, background: "#0ea5e9", top: "0", left: "50%", transform: "translateX(-50%)", opacity: 0.12 }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            className="text-[10px] sm:text-xs tracking-[0.5em] text-[#38bdf8] uppercase mb-5 font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("portfolio.eyebrow")}
          </motion.p>
          <motion.h1
            className="text-hero font-display font-light tracking-wider mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("portfolio.main")}
            <span className="gradient-text italic">{t("portfolio.accent")}</span>
          </motion.h1>
          <motion.div
            className="hero-line-center mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
          <motion.p
            className="text-[#8395b8] max-w-xl mx-auto text-sm sm:text-base px-2 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t("portfolio.text")}
          </motion.p>
        </div>
      </section>

      {/* Sections */}
      <div className="px-6 sm:px-8 lg:px-12 pb-24 sm:pb-32">
        {sections.map((section) => (
          <section
            key={section.id}
            id={`section-${section.id}`}
            className="py-24 sm:py-32 scroll-mt-24"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="relative mb-16 sm:mb-24 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
              >
                <span className="section-number">
                  {String(section.id).padStart(2, "0")}
                </span>
                <div className="relative z-10">
                  <p className="text-[10px] sm:text-xs tracking-[0.5em] text-[#38bdf8] uppercase mb-4 font-mono">
                    {t("portfolio.section")}{" "}
                    {String(section.id).padStart(2, "0")}
                  </p>
                  <h2 className="text-heading sm:text-4xl md:text-5xl font-display font-light tracking-wider mb-4">
                    {sectionTitle(section.id)}
                  </h2>
                  <p className="text-base sm:text-lg text-[#38bdf8]/70 mb-5 font-display italic">
                    {sectionCategory(section.id)}
                  </p>
                  <div className="hero-line-center mx-auto mb-6" />
                  <p className="text-[#8395b8] max-w-xl mx-auto text-sm sm:text-base font-body">
                    {sectionDescription(section.id)}
                  </p>
                </div>
              </motion.div>

              {section.videos.length > 0 ? (
                section.videos.length === 1 ? (
                  <div className="flex justify-center">
                    <div className="w-full max-w-[320px]">
                      <VideoCard
                        youtubeId={section.videos[0].youtubeId}
                        name={section.videos[0].name}
                        index={0}
                        thumbnailFrame={section.videos[0].thumbnailFrame}
                        customThumbnail={section.videos[0].customThumbnail}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 justify-items-center">
                    {section.videos.map((video, index) => (
                      <div key={video.id} className="w-full max-w-[320px]">
                        <VideoCard
                          youtubeId={video.youtubeId}
                          name={video.name}
                          index={index}
                          thumbnailFrame={video.thumbnailFrame}
                          customThumbnail={video.customThumbnail}
                        />
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <motion.div
                  className="py-24 sm:py-32 text-center border border-[#18243d] rounded-3xl bg-[#0c1322] relative overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="grid-bg absolute inset-0 opacity-30" />
                  <p className="text-[#4a5d80] text-sm sm:text-base tracking-[0.25em] uppercase font-mono relative z-10 animate-blink">
                    {t("videoCard.comingSoon")}
                  </p>
                </motion.div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
