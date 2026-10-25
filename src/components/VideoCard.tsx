"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getVideoThumbnailUrl } from "@/data/portfolio";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

interface VideoCardProps {
  youtubeId?: string;
  videoSrc?: string;
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

export default function VideoCard({
  youtubeId,
  videoSrc,
  name,
  index,
  thumbnailFrame,
  customThumbnail,
}: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const fullHostRef = useRef<HTMLDivElement>(null);
  const fullPlayerRef = useRef<any>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const { t } = useLang();

  const isLocalVideo = Boolean(videoSrc);

  // Load YouTube API only when this card uses a YouTube video.
  useEffect(() => {
    if (isLocalVideo || typeof window === "undefined" || window.YT) return;

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );

    if (!existingScript) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.head.appendChild(tag);
    }
  }, [isLocalVideo]);

  const createPlayer = useCallback(
    (hostEl: HTMLDivElement, autoplay: boolean) => {
      if (!window.YT || !hostEl || !youtubeId) return null;

      const rect = hostEl.getBoundingClientRect();

      return new window.YT.Player(hostEl, {
        width: rect.width || "100%",
        height: rect.height || "100%",
        videoId: youtubeId,
        playerVars: { ...PLAYER_VARS(autoplay), playlist: youtubeId },
        events: {
          onReady: () => {
            const iframe = hostEl.querySelector("iframe");
            if (iframe) {
              iframe.style.position = "absolute";
              iframe.style.top = "0";
              iframe.style.left = "0";
              iframe.style.width = "100%";
              iframe.style.height = "100%";
              iframe.style.border = "none";
            }
          },
          onError: () => setFailed(true),
        },
      });
    },
    [youtubeId]
  );

  const destroyPlayer = (playerRef: { current: any }) => {
    try {
      playerRef.current?.destroy();
    } catch {
      // Ignore errors if the YouTube player has already been destroyed.
    }
    playerRef.current = null;
  };

  const openFullscreen = () => {
    setFailed(false);
    setVideoLoading(true);
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeFullscreen = () => {
    setOpen(false);
    document.body.style.overflow = "";

    if (localVideoRef.current) {
      localVideoRef.current.pause();
    }

    destroyPlayer(fullPlayerRef);
  };

  // Initialize the YouTube player when the fullscreen modal opens.
  useEffect(() => {
    if (isLocalVideo || !open || !fullHostRef.current || !youtubeId) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const initializePlayer = () => {
      if (cancelled || !fullHostRef.current || fullPlayerRef.current) return;

      if (window.YT?.Player) {
        fullPlayerRef.current = createPlayer(fullHostRef.current, true);
      } else {
        timer = setTimeout(initializePlayer, 100);
      }
    };

    timer = setTimeout(initializePlayer, 200);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [open, createPlayer, isLocalVideo, youtubeId]);

  // Close the modal with Escape.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFullscreen();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Clean up when the component unmounts.
  useEffect(() => {
    return () => {
      destroyPlayer(fullPlayerRef);
      document.body.style.overflow = "";
    };
  }, []);

  const thumbSrc = customThumbnail
    ? customThumbnail
    : youtubeId
      ? getVideoThumbnailUrl(youtubeId, thumbnailFrame ?? "maxresdefault")
      : undefined;

  const fallbackSrc = youtubeId
    ? getVideoThumbnailUrl(youtubeId, "hqdefault")
    : undefined;

  return (
    <>
      <motion.div
        className="video-card group"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.7,
          delay: index * 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="relative aspect-[9/16] overflow-hidden bg-black">
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={openFullscreen}
            role="button"
            tabIndex={0}
            aria-label={`Play ${name}`}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openFullscreen();
              }
            }}
          >
            {!failed && (
              <div className="absolute inset-0 overflow-hidden">
                {thumbSrc ? (
                  <img
                    src={thumbSrc}
                    alt={name}
                    className="w-full h-full object-cover object-center transition-transform duration-[1.2s] group-hover:scale-105"
                    loading="lazy"
                    onError={(event) => {
                      const image = event.currentTarget;

                      if (fallbackSrc && !image.dataset.retried) {
                        image.dataset.retried = "1";
                        image.src = fallbackSrc;
                      } else {
                        image.style.display = "none";
                      }
                    }}
                  />
                ) : videoSrc ? (
                  <video
                    src={`${videoSrc}#t=0.5`}
                    className="w-full h-full object-cover object-center"
                    muted
                    playsInline
                    preload="metadata"
                    onError={() => setFailed(true)}
                  />
                ) : null}

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
              <p className="text-xs text-[#8395b8] font-body">
                {t("videoCard.failed")}
              </p>

              <button
                className="px-6 py-3 text-[11px] tracking-[0.2em] uppercase rounded-full font-mono border border-[#38bdf8]/50 text-[#7dd3fc] hover:bg-[#38bdf8]/10 transition-colors"
                onClick={() => setFailed(false)}
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
            {isLocalVideo ? (
              <video
                ref={localVideoRef}
                src={videoSrc}
                poster={thumbSrc}
                className="absolute inset-0 w-full h-full object-contain"
                autoPlay
                controls
                playsInline
                preload="auto"
                onLoadedData={() => setVideoLoading(false)}
                onCanPlay={() => setVideoLoading(false)}
                onError={() => setFailed(true)}
              />
            ) : (
              <div
                ref={fullHostRef}
                className="absolute left-0 right-0 -bottom-8 h-[calc(100%+32px)]"
              />
            )}

            {isLocalVideo && videoLoading && !failed && (
              <div className="absolute inset-0 z-[101] flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-[#38bdf8] animate-spin" />
              </div>
            )}

            {failed && (
              <div className="absolute inset-0 z-[103] flex items-center justify-center bg-black text-white">
                <p>{t("videoCard.failed")}</p>
              </div>
            )}

            {!isLocalVideo && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-black z-[102] pointer-events-none" />
            )}

            <button
              onClick={closeFullscreen}
              className="absolute top-28 right-4 z-[104] w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-black/70 transition-all duration-200 group/close"
              aria-label="Close"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="group-hover/close:rotate-90 transition-transform duration-300"
              >
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