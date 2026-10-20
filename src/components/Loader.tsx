"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + Math.random() * 9 + 3;
      });
    }, 90);
    return () => clearInterval(interval);
  }, []);

  const pct = Math.min(Math.round(progress), 100);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loader-container"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid-bg absolute inset-0 opacity-30" />
          <div
            className="aurora-blob animate-float-slow"
            style={{ width: 420, height: 420, background: "#0ea5e9", top: "25%", left: "35%" }}
          />
          <div
            className="aurora-blob animate-float-slow"
            style={{ width: 300, height: 300, background: "#38bdf8", bottom: "20%", right: "30%", animationDelay: "3s" }}
          />

          <div className="relative flex flex-col items-center gap-10 z-10">
            <div className="relative">
              <div className="loader-ring" />
              <div className="loader-ring-inner" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-xs font-mono text-[#38bdf8] tracking-[0.15em] tabular-nums">
                  {pct}
                </span>
              </motion.div>
            </div>

            <div className="flex flex-col items-center gap-5">
              <motion.div
                className="overflow-hidden"
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-4xl md:text-5xl font-display font-light tracking-[0.3em] gradient-text pl-[0.3em]">
                  BADR
                </p>
              </motion.div>

              <div className="w-56 md:w-64 h-[2px] bg-[#111b30] relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0ea5e9] via-[#38bdf8] to-[#7dd3fc] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <motion.p
                className="text-[10px] tracking-[0.4em] text-[#3a4a68] uppercase font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Cinematic Experience
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
