import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Grotesk, Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import { LanguageProvider } from "@/i18n/LanguageContext";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BADR | Cinematic Storyteller & Visual Artist",
  description:
    "Portfolio of BADR — Cinematic storyteller, filmmaker, and visual artist specializing in automotive films, fashion campaigns, food cinematography, and AI-powered visual productions.",
  keywords: [
    "Badr", "cinematographer", "filmmaker", "photographer", "portfolio",
    "automotive films", "fashion campaigns", "food cinematography", "AI films",
  ],
  openGraph: {
    title: "BADR | Cinematic Storyteller & Visual Artist",
    description: "Portfolio of BADR — Cinematic storyteller, filmmaker, and visual artist.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="noise-overlay" />
        <div aria-hidden="true" className="page-frame pointer-events-none" />
        <CustomCursor />
        <Loader />
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
