"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ThreeDCard } from "./ThreeDCard";
import {
  Sparkles,
  ArrowDown,
  ShieldCheck,
  Compass,
  Radio,
  Clock,
  CheckCircle2,
  Atom,
} from "lucide-react";
import { FACTS } from "@/data/facts";

interface HeroProps {
  onOpenSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSearch }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 1,
          },
          "-=0.5"
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            scale: 0.95,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          statsRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          cardsRef.current,
          {
            opacity: 0,
            x: 40,
            scale: 0.92,
            duration: 1.2,
          },
          "-=1"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const heroFact1 = FACTS[0]; // Quantum Entanglement
  const heroFact2 = FACTS[1]; // Neutron Stars

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] pt-36 pb-24 flex items-center justify-center overflow-hidden bg-cyber-grid"
    >
      {/* Dynamic Ambient Background Radial Glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-blue-500/10 dark:bg-cyan-500/20 blur-[140px] -z-10" />
      <div className="pointer-events-none absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Editorial Typography & High-Tech CTAs */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Live Telemetry Badge */}
            <div ref={badgeRef} className="flex items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-500/15 border border-blue-200 dark:border-cyan-500/30 text-blue-700 dark:text-electric text-xs font-mono tracking-wider shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-neon opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-neon" />
                </span>
                <span className="font-semibold">NEXUS VERIFIED ARCHIVE // 2026 EDITION</span>
              </div>
            </div>

            {/* Headline */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-foreground leading-[1.08] mb-6"
            >
              Discover Facts That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-600 dark:from-cyan-400 dark:via-blue-500 dark:to-emerald-400">
                Change The Way
              </span>{" "}
              You See The World.
            </h1>

            {/* Subheading */}
            <p
              ref={descRef}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-8"
            >
              Explore thousands of rigorously verified, mind-expanding facts across
              quantum physics, ancient civilizations, machine intelligence, deep space, and
              biological consciousness.
            </p>

            {/* Primary & Secondary CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12"
            >
              <a
                href="#popular-facts"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400 text-white dark:text-black shadow-md hover:shadow-xl dark:shadow-neon-blue dark:hover:shadow-neon-green transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Launch Fact Stream</span>
                <ArrowDown className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href="#fact-of-the-day"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base bg-white dark:bg-cyber-900/80 border border-slate-200/90 dark:border-white/15 hover:border-blue-400 dark:hover:border-cyan-400/60 text-slate-800 dark:text-foreground hover:text-blue-600 dark:hover:text-electric shadow-sm backdrop-blur-md transition-all duration-300"
              >
                <Radio className="w-4 h-4 text-blue-500 dark:text-cyan-400 animate-pulse" />
                <span>Fact of the Day</span>
              </a>

              <button
                onClick={onOpenSearch}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-foreground transition-colors"
                aria-label="Search all facts"
              >
                <Compass className="w-4 h-4" />
                <span>Search Archive</span>
              </button>
            </div>

            {/* Telemetry Stats Row */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-white/10 max-w-xl"
            >
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground">
                  42.9K<span className="text-blue-600 dark:text-electric">+</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Verified Insights
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground">
                  11<span className="text-emerald-600 dark:text-neon">/11</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Knowledge Disciplines
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground">
                  99.8<span className="text-blue-600 dark:text-electric">%</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Peer-Verified Data
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Layered Floating 3D Fact Cards */}
          <div ref={cardsRef} className="lg:col-span-5 relative w-full">
            {/* Background accent frame */}
            <div className="pointer-events-none absolute -inset-4 rounded-3xl border border-blue-500/15 dark:border-cyan-500/20 bg-gradient-to-tr from-blue-500/5 to-emerald-500/5 -z-10 blur-sm" />

            {/* Main Primary 3D Floating Hero Card */}
            <ThreeDCard
              depth={35}
              maxRotation={10}
              borderGlow="blue"
              className="relative z-20 w-full"
            >
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-cyber-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-[0_15px_40px_-5px_rgba(15,23,42,0.12)] dark:shadow-none">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/30 text-blue-600 dark:text-cyan-400 text-xs font-mono font-medium">
                    <Atom className="w-3.5 h-3.5 animate-spin text-blue-600 dark:text-cyan-400" />
                    <span>FEATURED QUANTUM DISCOVERY</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">#01 // SPOTLIGHT</span>
                </div>

                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-5 border border-slate-200/80 dark:border-white/10">
                  <Image
                    src={heroFact1.imageUrl}
                    alt={heroFact1.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent dark:from-cyber-950/90 dark:via-transparent dark:to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-mono">
                    <span className="bg-black/60 dark:bg-cyber-950/80 px-2 py-0.5 rounded border border-white/20 backdrop-blur-sm">
                      Telemetry: 0.000 ms Latency
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 bg-black/60 dark:bg-transparent px-2 py-0.5 rounded border border-white/10 dark:border-none backdrop-blur-sm">
                      <ShieldCheck className="w-3.5 h-3.5" /> Peer Reviewed
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-3 leading-snug">
                  {heroFact1.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
                  {heroFact1.hook}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                    <span>{heroFact1.readTime}</span>
                    <span>•</span>
                    <span>{heroFact1.categoryName}</span>
                  </div>

                  <Link
                    href={`/article/${heroFact1.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-cyan-500/10 text-blue-600 dark:text-electric border border-blue-200 dark:border-cyan-500/40 hover:bg-blue-600 hover:text-white dark:hover:bg-electric dark:hover:text-black transition-all duration-300"
                  >
                    <span>Read Article</span>
                    <Sparkles className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </ThreeDCard>

            {/* Secondary Floating Mini Card (Overlapping depth layer) */}
            <div className="hidden sm:block absolute -bottom-8 -left-6 z-30 w-72">
              <ThreeDCard depth={20} maxRotation={8} borderGlow="green">
                <div className="p-4 rounded-xl bg-white/95 dark:bg-cyber-950/95 border border-emerald-500/30 backdrop-blur-xl shadow-[0_10px_30px_-5px_rgba(16,185,129,0.2)] dark:shadow-neon-green">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-mono mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>DAILY DEEP-SPACE ANOMALY</span>
                  </div>
                  <h4 className="text-xs font-bold text-foreground line-clamp-2 mb-1">
                    {heroFact2.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2">
                    <span className="text-emerald-600 dark:text-neon font-semibold">{heroFact2.statHighlight?.value}</span>
                    <span>{heroFact2.readTime}</span>
                  </div>
                </div>
              </ThreeDCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
