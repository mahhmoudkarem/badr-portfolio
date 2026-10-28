"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import SectionCard from "@/components/SectionCard";
import { sections, getVideoThumbnailUrl } from "@/data/portfolio";
import { useLang } from "@/i18n/LanguageContext";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Constants & Data
/* ------------------------------------------------------------------ */

// Drone, Automotive, Food & Beverage, Fashion, Interior Design
const FEATURED_SECTION_IDS: readonly number[] = [1, 2, 4, 8, 9];

const MARQUEE_ITEMS = [
  "Drone",
  "Automotive",
  "Fashion",
  "Food & Beverage",
  "Events",
  "Interior Design",
  "Hotels",
  "On-Camera",
  "Shoes",
] as const;

const SERVICES = [
  {
    num: "01",
    titleKey: "service.1.title",
    descKey: "service.1.desc",
  },
  {
    num: "02",
    titleKey: "service.2.title",
    descKey: "service.2.desc",
  },
  {
    num: "03",
    titleKey: "service.3.title",
    descKey: "service.3.desc",
  },
  {
    num: "04",
    titleKey: "service.4.title",
    descKey: "service.4.desc",
  },
] as const;

type Service = (typeof SERVICES)[number];

const CATEGORY_COUNT = 8;

const TOTAL_VIDEOS = sections.reduce(
  (acc, section) => acc + section.videos.length,
  0
);

const FEATURED_SECTIONS = sections.filter((section) =>
  FEATURED_SECTION_IDS.includes(section.id)
);

const STATS = [
  { labelKey: "stats.projects", target: sections.length },
  { labelKey: "stats.videos", target: TOTAL_VIDEOS },
  { labelKey: "stats.categories", target: CATEGORY_COUNT },
] as const;

type Stat = (typeof STATS)[number];

type CollageItem = {
  coverVideo: string;
  label: string;
  positionClassName: string;
  sizeClassName: string;
  rotateClassName: string;
  delay: number;
};

type CollageConfig = {
  sectionIndex: number;
  label: string;
  positionClassName: string;
  sizeClassName: string;
  rotateClassName: string;
  delay: number;
};

// sectionIndex = مكان القسم في array الـ sections (يبدأ من 0)
const COLLAGE_CONFIG: CollageConfig[] = [
  {
    sectionIndex: 1, // Automotive
    label: "Automotive",
    positionClassName: "left-3 top-6 lg:left-0 lg:top-8",
    sizeClassName: "w-40 h-60 sm:w-52 sm:h-72 lg:w-72 lg:h-[480px]",
    rotateClassName: "-rotate-6 lg:-rotate-3",
    delay: 0,
  },
  {
    sectionIndex: 7, // Fashion
    label: "Fashion",
    positionClassName: "right-4 top-0 lg:right-0 lg:top-0",
    sizeClassName: "w-36 h-52 sm:w-44 sm:h-64 lg:w-56 lg:h-80",
    rotateClassName: "rotate-6 lg:rotate-6",
    delay: 0.15,
  },
  {
    sectionIndex: 3, // Food & Beverage
    label: "Food & Beverage",
    positionClassName: "left-6 bottom-0 lg:right-6 lg:left-auto lg:bottom-10",
    sizeClassName: "w-36 h-52 sm:w-44 sm:h-64 lg:w-52 lg:h-72",
    rotateClassName: "-rotate-3 lg:rotate-3",
    delay: 0.3,
  },
  {
    sectionIndex: 8, // Interior Design
    label: "Interior Design",
    positionClassName: "right-6 bottom-4 lg:left-6 lg:right-auto lg:bottom-0",
    sizeClassName: "w-32 h-44 sm:w-40 sm:h-56 lg:w-48 lg:h-64",
    rotateClassName: "rotate-3 lg:-rotate-6",
    delay: 0.45,
  },
];

const COLLAGE_ITEMS: CollageItem[] = COLLAGE_CONFIG.flatMap((config) => {
  const section = sections[config.sectionIndex];

  if (!section || section.coverVideo == null) {
    return [];
  }

  return [
    {
      coverVideo: section.coverVideo,
      label: config.label,
      positionClassName: config.positionClassName,
      sizeClassName: config.sizeClassName,
      rotateClassName: config.rotateClassName,
      delay: config.delay,
    },
  ];
});

/* ------------------------------------------------------------------ */
/* Animation Config
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const viewportOnce = {
  once: true,
  amount: 0.3,
} as const;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]";

/* ------------------------------------------------------------------ */
/* Small Reusable Components
/* ------------------------------------------------------------------ */

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`transition-transform duration-300 rtl:rotate-180 ${className ?? ""}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function SplitTitle({
  text,
  delay = 0,
  gradient = false,
}: {
  text: string;
  delay?: number;
  gradient?: boolean;
}) {
  const letters = Array.from(text);

  return (
    <span aria-hidden="true" className="inline-block">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className={gradient ? "inline-block gradient-text" : "inline-block"}
          initial={{ opacity: 0, y: 42, rotateX: 55 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.9,
            delay: delay + index * 0.06,
            ease: EASE,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="text-center mb-16 sm:mb-24"
    >
      <p className="text-[10px] sm:text-xs tracking-[0.5em] text-[#38bdf8] uppercase mb-4 font-mono">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="text-display font-display font-light tracking-wider"
      >
        {title}
      </h2>
    </motion.div>
  );
}

function CountUp({
  target,
  suffix = "",
  padLength = 2,
  duration = 1.6,
}: {
  target: number;
  suffix?: string;
  padLength?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(target * easedProgress));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {`${String(displayValue).padStart(padLength, "0")}${suffix}`}
    </span>
  );
}

function CollageCard({ item }: { item: CollageItem }) {
  const [hasImageError, setHasImageError] = useState(false);
  const { category } = useLang();

  const src = getVideoThumbnailUrl(item.coverVideo);

  return (
    <motion.div
      className={`absolute ${item.positionClassName} ${item.rotateClassName} ${item.sizeClassName} opacity-60 overflow-hidden rounded-2xl border border-[#16203a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]`}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 0.6, y: 0, scale: 1 }}
      whileHover={{ opacity: 1, scale: 1.05, rotate: 0, zIndex: 20 }}
      transition={{
        duration: 1,
        delay: 1.1 + item.delay,
        ease: EASE,
      }}
    >
      <div className="relative h-full w-full bg-[#0b1220]">
        {src && !hasImageError ? (
          <img
            src={src}
            alt={item.label}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              if (!el.dataset.retried) {
                el.dataset.retried = "1";
                el.src = getVideoThumbnailUrl(item.coverVideo, "hqdefault");
              } else {
                setHasImageError(true);
              }
            }}
          />
        ) : (
          <div
            className="h-full w-full bg-gradient-to-br from-[#111b30] via-[#0c1322] to-[#050810]"
            aria-hidden="true"
          />
        )}

        <div
          className="absolute inset-0 bg-gradient-to-t from-[#050810]/80 via-transparent to-transparent"
          aria-hidden="true"
        />

        <p className="absolute bottom-3 left-3 text-[9px] tracking-[0.3em] text-[#38bdf8] uppercase font-mono">
          {category(item.label)}
        </p>
      </div>
    </motion.div>
  );
}

function CategoryMarquee() {
  const { category } = useLang();

  return (
    <section
      aria-label="Content categories"
      className="py-8 sm:py-10 border-b border-[#111b30] overflow-hidden"
    >
      <div className="marquee flex whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, groupIndex) => (
          <div
            key={groupIndex}
            aria-hidden={groupIndex > 0 ? true : undefined}
            className="flex items-center gap-6 sm:gap-8 mx-4 sm:mx-8"
          >
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={`${groupIndex}-${item}`}
                className="flex items-center gap-6 sm:gap-8"
              >
                <span className="text-xs sm:text-sm tracking-[0.3em] text-[#223450] uppercase font-mono">
                  {category(item)}
                </span>
                <span
                  aria-hidden="true"
                  className="text-[#38bdf8]/40 text-xs"
                >
                  &#9670;
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page
/* ------------------------------------------------------------------ */

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { t, isRtl } = useLang();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroFadeOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="page-enter">
        {/* ============================== */}
        {/* Hero                           */}
        {/* ============================== */}
        <section
          ref={heroRef}
          aria-labelledby="hero-heading"
          className="relative min-h-screen flex items-center overflow-hidden px-6 sm:px-8 lg:px-12"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#050810] via-[#070c18] to-[#050810]"
          />

          <div
            aria-hidden="true"
            className="grid-bg absolute inset-0 opacity-40"
          />

          <div aria-hidden="true" className="aurora-bg">
            <motion.div
              className="aurora-blob animate-float-slow"
              style={{
                width: 600,
                height: 600,
                background: "#0ea5e9",
                top: "5%",
                left: "-5%",
                opacity: 0.22,
              }}
            />
            <motion.div
              className="aurora-blob animate-float-slow"
              style={{
                width: 500,
                height: 500,
                background: "#38bdf8",
                bottom: "0",
                right: "10%",
                opacity: 0.15,
                animationDelay: "3s",
              }}
            />
          </div>

          <motion.div
            style={{ y: heroContentY, opacity: heroFadeOpacity }}
            className="relative z-10 w-full max-w-7xl mx-auto py-32 sm:py-40"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 items-center">
              {/* Hero Text */}
              <div className="text-center lg:text-start">
                <motion.div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#38bdf8]/20 bg-[#0c1322]/60 backdrop-blur-sm mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"
                  />
                  <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#7dd3fc] uppercase font-mono">
                    {t("hero.badge")}
                  </span>
                </motion.div>

                <h1
                  id="hero-heading"
                  aria-label={isRtl ? "بدر فريد" : "BADR Fared"}
                  className="title-shine relative text-hero font-display font-light leading-[0.9] mb-6"
                >
                  {isRtl ? (
                    <>
                      <motion.span
                        className="block text-white"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
                      >
                        بدر
                      </motion.span>
                      <motion.span
                        className="block gradient-text"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
                      >
                        فريد
                      </motion.span>
                    </>
                  ) : (
                    <>
                      <span className="block text-white">
                        <SplitTitle text="BADR" delay={0.55} />
                      </span>
                      <span className="block">
                        <SplitTitle text="Fared" delay={0.85} gradient />
                      </span>
                    </>
                  )}
                </h1>

                <motion.div
                  aria-hidden="true"
                  className="hero-line mx-auto lg:mx-0 mb-8"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ duration: 1, delay: 0.9 }}
                />

                <motion.p
                  className="text-base sm:text-lg md:text-xl text-[#8395b8] font-body font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.75 }}
                >
                  {t("hero.tagline")}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 sm:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.95 }}
                >
                  <Link
                    href="/portfolio"
                    className={`btn-primary px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium rounded-full w-full sm:w-auto text-center font-mono ${focusRing}`}
                  >
                    <span>{t("hero.viewVideos")}</span>
                  </Link>

                  <Link
                    href="/photos"
                    className={`btn-ghost px-8 py-4 text-sm tracking-[0.2em] uppercase rounded-full w-full sm:w-auto text-center font-mono ${focusRing}`}
                  >
                    {t("hero.viewPhotos")}
                  </Link>
                </motion.div>
              </div>

              {/* Hero Collage */}
              {COLLAGE_ITEMS.length > 0 && (
                <div className="relative h-[440px] sm:h-[520px] lg:h-[640px] w-full">
                  <div className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48">
                    <motion.div
                      aria-hidden="true"
                      className="absolute -inset-4 rounded-full border border-[#38bdf8]/30"
                      animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      aria-hidden="true"
                      className="absolute -inset-2.5 rounded-full border border-dashed border-[#7dd3fc]/40"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-[#38bdf8]/20 blur-xl"
                      animate={{ opacity: [0.35, 0.7, 0.35] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#38bdf8]/70 shadow-[0_0_60px_rgba(56,189,248,0.4)]"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <img
                        src="/man.png"
                        alt="Badr portrait"
                        className="w-full h-full object-cover"
                        loading="eager"
                        decoding="async"
                      />
                    </motion.div>
                  </div>

                  {COLLAGE_ITEMS.map((item) => (
                    <CollageCard
                      key={`${item.label}-${item.positionClassName}`}
                      item={item}
                    />
                  ))}

                  <motion.div
                    aria-hidden="true"
                    className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full border border-[#38bdf8]/10"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />

                  <motion.div
                    aria-hidden="true"
                    className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#38bdf8]/5 blur-2xl"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div style={{ opacity: heroFadeOpacity }} aria-hidden="true">
              <motion.div
                className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-[#38bdf8] to-transparent mx-auto mb-3"
                animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#3a4a68] uppercase font-mono text-center">
                {t("hero.scroll")}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ============================== */}
        {/* Stats                          */}
        {/* ============================== */}
        <section
          aria-label="Portfolio statistics"
          className="border-y border-[#111b30] bg-[#070c18]"
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-8 py-14 sm:py-20">
            <div className="grid grid-cols-3 gap-6 sm:gap-10">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.labelKey}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                >
                  <p className="text-4xl sm:text-5xl md:text-6xl font-display font-light gradient-text mb-2">
                    <CountUp target={stat.target} />
                  </p>
                  <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#5a6b8a] uppercase font-mono">
                    {t(stat.labelKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================== */}
        {/* Marquee                        */}
        {/* ============================== */}
        <CategoryMarquee />

        {/* ============================== */}
        {/* Featured Work                  */}
        {/* ============================== */}
        <section
          aria-labelledby="featured-heading"
          className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              id="featured-heading"
              eyebrow={t("featured.eyebrow")}
              title={
                <>
                  {t("featured.main")}
                  <span className="gradient-text italic">{t("featured.accent")}</span>
                </>
              }
            />

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {FEATURED_SECTIONS.map((section, index) => (
                <motion.div
                  key={section.id}
                  variants={fadeUp}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="w-full max-w-md"
                >
                  <SectionCard section={section} index={index} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-12 sm:mt-16"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Link
                href="/portfolio"
                className={`btn-ghost group inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm tracking-[0.2em] uppercase rounded-full font-mono ${focusRing}`}
              >
                {t("featured.viewAll")}
                <ArrowRightIcon className="group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ============================== */}
        {/* Services                       */}
        {/* ============================== */}
        <section
          aria-labelledby="services-heading"
          className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 bg-[#070c18] relative overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="grid-bg absolute inset-0 opacity-30"
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <SectionHeading
              id="services-heading"
              eyebrow={t("services.eyebrow")}
              title={
                <>
                  {t("services.main")}
                  <span className="gradient-text italic">{t("services.accent")}</span>
                </>
              }
            />

            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {SERVICES.map((service) => (
                <motion.li
                  key={service.num}
                  variants={fadeUp}
                  className="service-card glow-border group p-8 sm:p-10 border border-[#18243d] rounded-2xl bg-[#0c1322] relative overflow-hidden"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-6 right-4 font-display text-[6rem] font-extrabold text-[#38bdf8]/5 italic pointer-events-none select-none"
                  >
                    {service.num}
                  </span>

                  <div className="relative z-10">
                    <span className="text-xs text-[#38bdf8] font-mono tracking-widest">
                      {service.num}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-display font-light text-white mt-3 mb-3 tracking-wide group-hover:text-[#38bdf8] transition-colors duration-300">
                      {t(service.titleKey)}
                    </h3>

                    <p className="text-sm text-[#8395b8] leading-relaxed font-body">
                      {t(service.descKey)}
                    </p>

                    <div
                      aria-hidden="true"
                      className="mt-6 w-10 h-[1px] bg-[#38bdf8]/40 group-hover:w-20 transition-all duration-500"
                    />
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* ============================== */}
        {/* About Teaser                   */}
        {/* ============================== */}
        <section
          aria-labelledby="about-heading"
          className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12"
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-14 md:gap-20">
            <motion.div
              className="flex-1 text-center md:text-start"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] sm:text-xs tracking-[0.5em] text-[#38bdf8] uppercase mb-4 font-mono">
                {t("about.eyebrow")}
              </p>

              <h2
                id="about-heading"
                className="text-display font-display font-light tracking-wider mb-6"
              >
                {t("about.title")}
              </h2>

              <div
                aria-hidden="true"
                className="hero-line mx-auto md:mx-0 mb-8"
              />

              <p className="text-[#8395b8] leading-relaxed mb-8 max-w-xl font-body">
                {t("about.text")}
              </p>

              <Link
                href="/about"
                className={`group inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.2em] uppercase text-[#38bdf8] hover:text-[#7dd3fc] transition-colors font-mono ${focusRing}`}
              >
                {t("about.learnMore")}
                <ArrowRightIcon className="group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
              </Link>
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="flex-1 relative w-full max-w-sm mx-auto"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#111b30] relative">
                <div className="grid-bg absolute inset-0 opacity-60" />

                <div className="w-full h-full flex items-center justify-center relative">
                  <div
                    aria-hidden="true"
                    className="absolute inset-8 rounded-full border border-dashed border-[#38bdf8]/20 animate-spin-slow"
                  />
                  <motion.span
                    className="relative text-[8rem] sm:text-[10rem] font-display font-light gradient-text opacity-20 italic"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    B
                  </motion.span>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-5 w-28 h-28 sm:w-32 sm:h-32 border border-[#38bdf8]/15 rounded-2xl" />
              <div className="absolute -top-5 -left-5 w-28 h-28 sm:w-32 sm:h-32 border border-[#38bdf8]/15 rounded-2xl" />
            </motion.div>
          </div>
        </section>

        {/* ============================== */}
        {/* CTA                            */}
        {/* ============================== */}
        <section
          aria-labelledby="cta-heading"
          className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="p-8 sm:p-12 border border-[#38bdf8]/15 rounded-3xl bg-[#0c1322] relative overflow-hidden"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div
                aria-hidden="true"
                className="grid-bg absolute inset-0 opacity-30"
              />

              <div
                aria-hidden="true"
                className="aurora-blob animate-float-slow"
                style={{
                  width: 300,
                  height: 300,
                  background: "#0ea5e9",
                  top: "-40%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: 0.15,
                }}
              />

              <div className="relative z-10">
                <p className="text-[10px] sm:text-xs tracking-[0.5em] text-[#38bdf8] uppercase mb-4 font-mono">
                  {t("cta.eyebrow")}
                </p>

                <h2
                  id="cta-heading"
                  className="text-display font-display font-light tracking-wider mb-8"
                >
                  {t("cta.title")}
                </h2>

                <Link
                  href="/contact"
                  className={`btn-primary group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-sm tracking-[0.2em] uppercase font-medium rounded-full font-mono ${focusRing}`}
                >
                  <span>{t("cta.button")}</span>
                  <ArrowRightIcon className="group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}