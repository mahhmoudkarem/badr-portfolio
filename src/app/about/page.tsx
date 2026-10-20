"use client";

import { motion } from "framer-motion";
import { sections } from "@/data/portfolio";
import { useLang } from "@/i18n/LanguageContext";

const totalVideos = sections.reduce((acc, s) => acc + s.videos.length, 0);

const stats = [
  { labelKey: "stats.projects", value: String(sections.length).padStart(2, "0") },
  { labelKey: "stats.videos", value: String(totalVideos).padStart(2, "0") },
  { labelKey: "stats.categories", value: "08" },
] as const;

const skills = [
  "skill.1",
  "skill.2",
  "skill.3",
  "skill.4",
  "skill.5",
  "skill.6",
  "skill.7",
  "skill.8",
  "skill.9",
  "skill.10",
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const viewportOnce = { once: true, amount: 0.3 } as const;

export default function About() {
  const { t } = useLang();

  return (
    <div className="page-enter pt-20 sm:pt-24">
      {/* ===== Hero ===== */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div
          aria-hidden="true"
          className="aurora-blob animate-float-slow"
          style={{
            width: 400,
            height: 400,
            background: "#0ea5e9",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0.12,
          }}
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#38bdf8]/20 bg-[#0c1322]/60 backdrop-blur-sm mb-8">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"
              />
              <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#7dd3fc] uppercase font-mono">
                {t("about.eyebrow")}
              </span>
            </span>
          </motion.div>

          <motion.h1
            className="text-hero font-display font-light leading-[0.95] mb-7"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.35 }}
          >
            <span className="block text-white">{t("aboutPage.im")}</span>
            <span className="block gradient-text text-glow italic">Badr</span>
          </motion.h1>

          <motion.div
            aria-hidden="true"
            className="hero-line-center mx-auto mb-10"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.7 }}
          />

          <motion.div
            className="space-y-6 text-[#8395b8] leading-relaxed text-sm sm:text-base font-body"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <p>{t("aboutPage.p1")}</p>
            <p>{t("aboutPage.p2")}</p>
          </motion.div>
        </div>
      </section>

      {/* ===== Portrait ===== */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative w-full max-w-xs mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#0c1322] relative">
              <div className="grid-bg absolute inset-0 opacity-60" />
              <div className="w-full h-full flex items-center justify-center">
                <motion.span
                  className="text-[8rem] sm:text-[10rem] font-display font-light gradient-text opacity-20 italic"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  B
                </motion.span>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 w-full h-full border border-[#38bdf8]/10 rounded-2xl -z-10"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="py-14 sm:py-20 px-6 sm:px-8 border-y border-[#111b30] bg-[#070c18]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-6 sm:gap-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <p className="text-4xl sm:text-5xl md:text-6xl font-display font-light gradient-text mb-3">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#5a6b8a] uppercase font-mono">
                  {t(stat.labelKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Philosophy ===== */}
      <section className="py-24 sm:py-36 px-6 sm:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-[10px] sm:text-xs tracking-[0.5em] text-[#38bdf8] uppercase mb-5 font-mono">
              {t("aboutPage.philosophy")}
            </p>
            <h2 className="text-heading md:text-4xl font-display font-light italic tracking-wider mb-10 leading-relaxed">
              {t("aboutPage.quote")}
            </h2>
            <div className="hero-line-center mx-auto" />
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[16rem] sm:text-[24rem] font-extrabold text-[#38bdf8]/5 italic pointer-events-none select-none"
        >
          B
        </div>
      </section>

      {/* ===== Skills ===== */}
      <section className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 bg-[#070c18] relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16 sm:mb-24"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-[10px] sm:text-xs tracking-[0.5em] text-[#38bdf8] uppercase mb-4 font-mono">
              {t("aboutPage.expertise")}
            </p>
            <h2 className="text-display font-display font-light tracking-wider">
              {t("aboutPage.skillsMain")}
              <span className="gradient-text italic">{t("aboutPage.skillsAccent")}</span>
            </h2>
          </motion.div>

          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {skills.map((skill, index) => (
              <motion.li
                key={skill}
                variants={fadeUp}
                className="glow-border p-6 sm:p-8 border border-[#18243d] rounded-2xl bg-[#0c1322] relative overflow-hidden group transition-colors duration-300"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-4 right-3 font-display text-6xl font-extrabold text-[#38bdf8]/10 italic pointer-events-none select-none group-hover:text-[#38bdf8]/20 transition-colors duration-500"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative z-10 flex items-center justify-center gap-4">
                  <span className="text-xs text-[#38bdf8] font-mono tracking-widest">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[#c0d0e8] tracking-wide text-sm sm:text-base font-body text-center">
                    {t(skill)}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </div>
  );
}
