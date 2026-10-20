"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/data/portfolio";
import { useLang } from "@/i18n/LanguageContext";

const contactMethods = [
  {
    nameKey: "contact.whatsapp",
    value: "+20 11 244 752 28",
    href: socialLinks.whatsapp,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    nameKey: "contact.instagram",
    value: "@badrfared.ph",
    href: socialLinks.instagram,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    nameKey: "contact.tiktok",
    value: "@badrfared.photoog",
    href: socialLinks.tiktok,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52V6.94a4.84 4.84 0 01-1-.25z" />
      </svg>
    ),
  },
  {
    nameKey: "contact.facebook",
    value: "Badr Fared",
    href: socialLinks.facebook,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
] as const;

export default function Contact() {
  const { t } = useLang();

  return (
    <div className="page-enter pt-16 sm:pt-20">
      {/* Hero */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div
          className="aurora-blob animate-float-slow"
          style={{ width: 400, height: 400, background: "#38bdf8", top: "0", left: "50%", transform: "translateX(-50%)", opacity: 0.1 }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            className="text-[10px] sm:text-xs tracking-[0.5em] text-[#38bdf8] uppercase mb-4 font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("contact.eyebrow")}
          </motion.p>
          <motion.h1
            className="text-hero font-display font-light tracking-wider mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("contact.connectMain")}
            <span className="gradient-text italic">{t("contact.connectAccent")}</span>
          </motion.h1>
          <motion.p
            className="text-[#8395b8] max-w-xl mx-auto text-sm sm:text-base px-2 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t("contact.text")}
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-10 sm:py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.nameKey}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-border group p-6 sm:p-8 border border-[#18243d] rounded-2xl bg-[#0c1322] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="text-[#38bdf8]">{method.icon}</div>
                  <div>
                    <p className="text-[10px] sm:text-xs tracking-[0.2em] text-[#5a6b8a] uppercase mb-2 font-mono">
                      {t(method.nameKey)}
                    </p>
                    <p className="text-base sm:text-lg text-[#c0d0e8] group-hover:text-[#38bdf8] transition-colors font-body">
                      {method.value}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-center gap-2 text-[#38bdf8] text-[10px] tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 font-mono">
                  <span>{t("contact.messageNow")}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="rtl:rotate-180">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Direct CTA */}
      <section className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="p-8 sm:p-12 border border-[#38bdf8]/15 rounded-3xl bg-[#0c1322] text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid-bg absolute inset-0 opacity-40" />
            <div
              className="aurora-blob animate-float-slow"
              style={{ width: 300, height: 300, background: "#0ea5e9", top: "-30%", left: "50%", transform: "translateX(-50%)", opacity: 0.15 }}
            />
            <div className="relative z-10">
              <p className="text-[10px] sm:text-xs tracking-[0.5em] text-[#38bdf8] uppercase mb-4 font-mono">
                {t("contact.directMessage")}
              </p>
              <h2 className="text-heading md:text-4xl font-display font-light tracking-wider mb-8">
                {t("contact.quickChat")}
              </h2>
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-sm tracking-[0.2em] uppercase font-medium rounded-full font-mono"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>{t("contact.chatWhatsApp")}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
