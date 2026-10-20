"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getVideoThumbnailUrl } from "@/data/portfolio";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

interface VideoCardProps {
  youtubeId: string;
  name: string;
  index: number;
  thumbnailFrame?: "0" | "1" | "2" | "3";
  customThumbnail?: string;
}

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const PLAYER_VARS = (autoplay = true) => ({
  autoplay: autoplay ? 1 : 0,
  controls: 0,
  modestbranding: 1,
  rel: 0,
  iv_load_policy: 3,
  fs: 0,
  playsinline: 1,
  disablekb: 1,
  loop: 1,
  playlist: "*",
  origin: typeof window !== "undefined" ? window.location.origin : undefined,
});

export default function VideoCard({ youtubeId, name, index, thumbnailFrame, customThumbnail }: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const fullHostRef = useRef<HTMLDivElement>(null);
  const fullPlayerRef = useRef<any>(null);
  const thumbHostRef = useRef<HTMLDivElement>(null);
  const thumbPlayerRef = useRef<any>(null);
  const { t } = useLang();

  useEffect(() => {
    if (typeof window === "undefined" || window.YT) return;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }, []);

  const createPlayer = useCallback(
    (hostEl: HTMLDivElement, autoplay: boolean, onReady?: () => void) => {
      if (!window.YT || !hostEl) return null;
      const rect = hostEl.getBoundingClientRect();
      return new window.YT.Player(hostEl, {
        width: rect.width || "100%",
        height: rect.height || "100%",
        videoId: youtubeId,
        playerVars: { ...PLAYER_VARS(autoplay), playlist: youtubeId },
        events: {
          onReady: () => {
            try {
              const iframe = hostEl.querySelector("iframe");
              if (iframe) {
                iframe.style.position = "absolute";
                iframe.style.top = "0";
                iframe.style.left = "0";
                iframe.style.width = "100%";
                iframe.style.height = "100%";
                iframe.style.border = "none";
              }
              onReady?.();
            } catch {}
          },
          onError: () => setFailed(true),
        },
      });
    },
    [youtubeId]
  );

  const destroyPlayer = (playerRef: React.MutableRefObject<any>) => {
    try {
      playerRef.current?.destroy();
    } catch {}
    playerRef.current = null;
  };

  const openFullscreen = () => {
    setFailed(false);
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeFullscreen = () => {
    setOpen(false);
    document.body.style.overflow = "";
    destroyPlayer(fullPlayerRef);
  };

  useEffect(() => {
    if (!open || !fullHostRef.current) return;
    const timer = setTimeout(() => {
      if (!fullPlayerRef.current && fullHostRef.current) {
        fullPlayerRef.current = createPlayer(fullHostRef.current, true);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [open, createPlayer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) closeFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    return () => {
      destroyPlayer(thumbPlayerRef);
      destroyPlayer(fullPlayerRef);
      document.body.style.overflow = "";
    };
  }, []);

  const thumbSrc = customThumbnail ?? getVideoThumbnailUrl(youtubeId, thumbnailFrame as any);
  const fallbackSrc = customThumbnail ?? getVideoThumbnailUrl(youtubeId, "hqdefault");

  return (
    <>
      <motion.div
        className="video-card group"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative aspect-[9/16] overflow-hidden bg-black">
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={openFullscreen}
          >
            {!failed && (
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={thumbSrc}
                  alt={name}
                  className="w-full h-full object-cover object-center transition-transform duration-[1.2s] group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    if (!el.dataset.retried) {
                      el.dataset.retried = "1";
                      el.src = fallbackSrc;
                    } else {
                      el.style.display = "none";
                    }
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#38bdf8]/50 flex items-center justify-center backdrop-blur-md bg-[#050810]/40"
                    whileHover={{ scale: 1.15, borderColor: "#38bdf8" }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#38bdf8" className="ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            )}
          </div>

          {failed && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 bg-[#0a1020] p-6 text-center">
              <p className="text-xs text-[#8395b8] font-body">{t("videoCard.failed")}</p>
              <button
                className="px-6 py-3 text-[11px] tracking-[0.2em] uppercase rounded-full font-mono border border-[#38bdf8]/50 text-[#7dd3fc] hover:bg-[#38bdf8]/10 transition-colors"
                onClick={() => { setFailed(false); }}
              >
                {t("videoCard.tryAgain")}
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
            <motion.div
              className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div ref={fullHostRef} className="absolute left-0 right-0 -bottom-8 h-[calc(100%+32px)]" />

              <div className="absolute bottom-0 left-0 right-0 h-16 bg-black z-[102] pointer-events-none" />

              <button
                onClick={closeFullscreen}
                className="absolute top-28 right-4 z-[102] w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-black/70 transition-all duration-200 group/close"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover/close:rotate-90 transition-transform duration-300">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
