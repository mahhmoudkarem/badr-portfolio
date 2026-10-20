"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { useLang } from "@/i18n/LanguageContext";
import LanguageSwitch from "@/i18n/LanguageSwitch";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.portfolio"), href: "/portfolio" },
    { name: t("nav.photos"), href: "/photos" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050810]/85 backdrop-blur-2xl border-b border-[#111b30]"
            : "bg-transparent border-b border-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
            <span className="text-lg sm:text-xl font-display font-light tracking-[0.3em] gradient-text pl-[0.3em]">
              BADR
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link text-[11px] tracking-[0.25em] uppercase font-mono font-medium ${
                  pathname === item.href ? "active" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitch />
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 z-50"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-6 h-[1.5px] bg-[#38bdf8] rounded-full"
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-[1.5px] bg-[#38bdf8] rounded-full"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-6 h-[1.5px] bg-[#38bdf8] rounded-full"
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>

        <motion.div
          className="h-[1.5px] bg-gradient-to-r from-[#0ea5e9] via-[#38bdf8] to-[#7dd3fc] origin-left rtl:origin-right"
          style={{ scaleX }}
        />
      </motion.nav>

      <motion.div
        className="fixed inset-0 z-40 md:hidden bg-[#050810]/98 backdrop-blur-2xl"
        initial={false}
        animate={mobileOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-full flex flex-col items-center justify-center gap-8 sm:gap-10">
          {navItems.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 25 }}
              animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ delay: mobileOpen ? 0.12 + i * 0.08 : 0 }}
            >
              <Link
                href={item.href}
                className={`text-3xl sm:text-4xl font-display font-light tracking-[0.12em] ${
                  pathname === item.href ? "text-[#38bdf8]" : "text-[#5a6b8a]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <div className="mt-6">
            <LanguageSwitch />
          </div>
        </div>
      </motion.div>
    </>
  );
}
