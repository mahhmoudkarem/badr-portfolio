"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/i18n/LanguageContext";

interface Photo {
  id: string;
  thumb: string;
  full: string;
}

interface PhotoSet {
  id: string;
  name: string;
  photos: Photo[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const viewportOnce = { once: true, amount: 0.2 } as const;

export default function Photos() {
  const { t, isRtl } = useLang();
  const [sets, setSets] = useState<PhotoSet[] | null>(null);
  const [error, setError] = useState(false);
  const [lightbox, setLightbox] = useState<{ setIndex: number; photoIndex: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch("/api/photos")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setSets(data.sets ?? []))
      .catch(() => setError(true));
  }, []);

  const openLightbox = useCallback(
    (setIndex: number, photoIndex: number) => setLightbox({ setIndex, photoIndex }),
    []
  );

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (!lightbox || !sets) return;
      const flat: { setIndex: number; photoIndex: number }[] = [];
      sets.forEach((set, si) => set.photos.forEach((_, pi) => flat.push({ setIndex: si, photoIndex: pi })));
      const cur = flat.findIndex(
        (p) => p.setIndex === lightbox.setIndex && p.photoIndex === lightbox.photoIndex
      );
      if (cur === -1) return;
      const next = (cur + dir + flat.length) % flat.length;
      setLightbox(flat[next]);
    },
    [lightbox, sets]
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate(isRtl ? 1 : -1);
      if (e.key === "ArrowRight") navigate(isRtl ? -1 : 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, navigate, isRtl]);

  const activePhoto =
    lightbox && sets
      ? sets[lightbox.setIndex]?.photos[lightbox.photoIndex] ?? null
      : null;

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
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0.12,
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            className="text-[10px] sm:text-xs tracking-[0.5em] text-[#38bdf8] uppercase mb-5 font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("photos.eyebrow")}
          </motion.p>
          <motion.h1
            className="text-hero font-display font-light tracking-wider mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("photos.main")}
            <span className="gradient-text italic">{t("photos.accent")}</span>
          </motion.h1>
          <motion.div
            aria-hidden="true"
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
            {t("photos.text")}
          </motion.p>
        </div>
      </section>

      {/* ===== Gallery ===== */}
      <section className="px-6 sm:px-8 lg:px-12 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <p className="text-center text-[#8395b8] py-24 font-body">{t("photos.empty")}</p>
          ) : !sets ? (
            <p className="text-center text-[#8395b8] py-24 font-body">{t("photos.loading")}</p>
          ) : sets.length === 0 ? (
            <p className="text-center text-[#8395b8] py-24 font-body">{t("photos.empty")}</p>
          ) : (
            sets.map((set, setIndex) => (
              <div key={set.id} className="mb-20 last:mb-0">
                <motion.div
                  className="flex items-center gap-4 mb-10"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  <span className="section-number">{String(setIndex + 1).padStart(2, "0")}</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#38bdf8]/40 to-transparent rtl:bg-gradient-to-l" />
                  <p className="text-[10px] sm:text-xs tracking-[0.4em] text-[#38bdf8] uppercase font-mono">
                    {set.name}
                  </p>
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {set.photos.map((photo, photoIndex) => (
                    <motion.button
                      key={photo.id}
                      type="button"
                      variants={fadeUp}
                      onClick={() => openLightbox(setIndex, photoIndex)}
                      className="relative aspect-square overflow-hidden rounded-xl bg-[#0c1322] border border-[#18243d] group cursor-zoom-in"
                      aria-label={set.name}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.thumb}
                        alt={`${set.name} photo ${photoIndex + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ===== Lightbox ===== */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {lightbox && activePhoto && (
              <motion.div
                className="fixed inset-0 z-[100] bg-[#050810]/95 backdrop-blur-xl flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLightbox}
              >
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="absolute top-5 right-5 z-10 w-11 h-11 flex items-center justify-center rounded-full border border-[#18243d] bg-[#0c1322]/80 text-[#7dd3fc] text-lg transition-colors hover:bg-[#18243d]"
                  aria-label={t("photos.close")}
                >
                  &times;
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(-1);
                  }}
                  className="absolute left-3 sm:left-6 z-10 w-11 h-11 flex items-center justify-center rounded-full border border-[#18243d] bg-[#0c1322]/80 text-[#7dd3fc] transition-colors hover:bg-[#18243d] rtl:rotate-180"
                  aria-label={t("photos.prev")}
                >
                  &#8592;
                </button>

                <motion.img
                  key={activePhoto.id}
                  src={activePhoto.full}
                  alt={`${sets![lightbox.setIndex].name} photo ${lightbox.photoIndex + 1}`}
                  className="max-w-[92vw] max-h-[85vh] object-contain rounded-lg"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(1);
                  }}
                  className="absolute right-3 sm:right-6 z-10 w-11 h-11 flex items-center justify-center rounded-full border border-[#18243d] bg-[#0c1322]/80 text-[#7dd3fc] transition-colors hover:bg-[#18243d] rtl:rotate-180"
                  aria-label={t("photos.next")}
                >
                  &#8594;
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
