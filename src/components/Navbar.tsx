"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import {
  Search,
  Sparkles,
  Menu,
  X,
  Compass,
  Flame,
  Zap,
  Layers,
  Radio,
  Dna,
} from "lucide-react";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenRandom: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenRandom }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Explorer", href: "#hero", icon: Compass },
    { label: "Daily Fact", href: "#fact-of-the-day", icon: Radio },
    { label: "Popular Bento", href: "#popular-facts", icon: Flame },
    { label: "Categories", href: "#categories", icon: Layers },
    { label: "Latest Pulse", href: "#latest-facts", icon: Zap },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/85 dark:bg-cyber-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-lg dark:shadow-black/20"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* BRAND LOGO */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="The Fact Site 3D Redesign Homepage"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 p-0.5 shadow-sm dark:shadow-neon-blue transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-[10px] bg-white dark:bg-cyber-950 flex items-center justify-center">
                <Dna className="w-5 h-5 text-blue-600 dark:text-electric group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-neon animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-foreground">
                  THE FACT SITE
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-blue-50 dark:bg-cyan-500/15 text-blue-600 dark:text-electric border border-blue-200 dark:border-cyan-500/30">
                  3D NEXUS
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase -mt-0.5">
                Modern Knowledge Platform
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/90 dark:bg-cyber-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-electric transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-neon transition-colors" />
                  <span>{link.label}</span>
                  <span className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10 dark:group-hover:bg-cyan-500/10 transition-colors" />
                </a>
              );
            })}
          </nav>

          {/* ACTION BUTTONS & THEME TOGGLE */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger (Command Palette) */}
            <button
              onClick={onOpenSearch}
              id="global-search-btn"
              aria-label="Search facts"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-cyber-900/80 border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-500/40 hover:text-blue-600 dark:hover:text-electric shadow-sm dark:shadow-none transition-all duration-200"
            >
              <Search className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Surprise Me / Random Fact HUD Trigger */}
            <button
              onClick={onOpenRandom}
              id="surprise-fact-btn"
              title="Generate a random verified fact"
              aria-label="Surprise Me Fact"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-600 hover:text-white dark:hover:bg-neon dark:hover:text-black hover:shadow-md dark:hover:shadow-neon-green transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Surprise Me</span>
            </button>

            {/* TOP RIGHT THEME TOGGLE */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-white/10 text-foreground hover:text-blue-600 dark:hover:text-electric transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE RESPONSIVE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full p-4 bg-white/95 dark:bg-cyber-950/98 border-b border-slate-200 dark:border-white/10 backdrop-blur-2xl shadow-xl animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-electric hover:bg-blue-50 dark:hover:bg-cyan-500/10 transition-colors"
                >
                  <Icon className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                  <span>{link.label}</span>
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRandom();
                }}
                className="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold bg-emerald-600 text-white dark:bg-neon dark:text-black font-mono shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>SCAN RANDOM FACT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
