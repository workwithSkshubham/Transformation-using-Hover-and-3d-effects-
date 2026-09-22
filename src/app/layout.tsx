import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "The Fact Site — Futuristic 3D UI Redesign | Mind-Blowing Facts",
  description:
    "Explore thousands of verified, mind-expanding facts across quantum physics, space, neuroscience, biology, and ancient history with an interactive 3D UI.",
  keywords: [
    "facts",
    "the fact site",
    "science facts",
    "space facts",
    "quantum physics",
    "3d ui",
    "futuristic website",
    "next.js",
    "gsap",
  ],
  authors: [{ name: "The Fact Site 3D Nexus Team" }],
  openGraph: {
    title: "The Fact Site — Futuristic 3D UI Redesign",
    description:
      "A high-precision editorial and technological fact-discovery platform with 3D perspective cards and GSAP animations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased selection:bg-blue-500/20 selection:text-blue-900 dark:selection:bg-cyan-500/30 dark:selection:text-cyan-200`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
