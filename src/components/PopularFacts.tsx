"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "./SectionHeading";
import { ThreeDCard } from "./ThreeDCard";
import { FactCard } from "./FactCard";
import { Fact } from "@/types";
import {
  Flame,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

interface PopularFactsProps {
  facts: Fact[];
  onQuickView: (fact: Fact) => void;
}

export const PopularFacts: React.FC<PopularFactsProps> = ({ facts, onQuickView }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      const cards = gridRef.current.children;

      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter popular facts
  const popularList = facts.filter((f) => f.isPopular);
  const spotlightFact = popularList[0] || facts[1]; // Neutron stars
  const mediumFact1 = popularList[1] || facts[2]; // Mycelium
  const wideFact = popularList[2] || facts[3]; // Brain 20W
  const compactFact1 = popularList[3] || facts[4]; // Roman Concrete
  const compactFact2 = popularList[4] || facts[5]; // Tardigrades

  return (
    <section id="popular-facts" ref={sectionRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="EDITORIAL BENTO GRID"
          title="Most Mind-Blowing Discoveries"
          subtitle="Curated by readership impact, empirical anomalies, and verified scientific breakthroughs."
          action={
            <div className="flex items-center gap-2 text-xs font-mono text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-cyan-500/30">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-neon" />
              <span>Real-Time Editorial Ranking</span>
            </div>
          }
        />

        {/* ASYMMETRIC BENTO GRID */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* 1. SPOTLIGHT CARD (Spans 7 cols on LG) */}
          <div className="lg:col-span-7">
            <ThreeDCard
              depth={30}
              maxRotation={8}
              borderGlow="blue"
              className="h-full"
            >
              <div className="relative flex flex-col justify-between h-full rounded-2xl overflow-hidden p-6 sm:p-8 bg-white dark:bg-cyber-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-[0_15px_40px_-5px_rgba(15,23,42,0.08)] dark:shadow-none group">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 border border-slate-200/80 dark:border-white/10">
                  <Image
                    src={spotlightFact.imageUrl}
                    alt={spotlightFact.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent dark:from-cyber-950 dark:via-cyber-950/20 dark:to-transparent" />

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-white/95 dark:bg-cyber-950/90 border border-blue-500/30 dark:border-cyan-500/40 text-blue-600 dark:text-cyan-400 text-xs font-semibold shadow-sm">
                    {spotlightFact.categoryName}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-mono">
                    <span className="text-emerald-400 font-bold text-sm bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                      {spotlightFact.statHighlight?.value} {spotlightFact.statHighlight?.label}
                    </span>
                    <span className="flex items-center gap-1 bg-black/60 dark:bg-cyber-950/80 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-blue-400 dark:text-cyan-400" /> {spotlightFact.readTime}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-electric transition-colors leading-tight">
                    <Link href={`/article/${spotlightFact.slug}`}>
                      {spotlightFact.title}
                    </Link>
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {spotlightFact.hook}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>By {spotlightFact.author.name}</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  </div>

                  <Link
                    href={`/article/${spotlightFact.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-cyan-500/15 text-blue-600 dark:text-electric border border-blue-200 dark:border-cyan-500/30 hover:bg-blue-600 hover:text-white dark:hover:bg-electric dark:hover:text-black hover:shadow-md transition-all"
                  >
                    <span>Read Spotlight</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </ThreeDCard>
          </div>

          {/* 2. MEDIUM CARD (Spans 5 cols on LG) */}
          <div className="lg:col-span-5">
            <FactCard fact={mediumFact1} index={2} onQuickView={onQuickView} />
          </div>

          {/* 3. WIDE PANORAMIC CARD (Spans 12 cols on LG) */}
          <div className="lg:col-span-12">
            <ThreeDCard
              depth={25}
              maxRotation={5}
              borderGlow="green"
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 rounded-2xl bg-white dark:bg-cyber-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-[0_15px_40px_-5px_rgba(15,23,42,0.08)] dark:shadow-none group items-center">
                <div className="md:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-200/80 dark:border-white/10">
                  <Image
                    src={wideFact.imageUrl}
                    alt={wideFact.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent dark:from-cyber-950/80 dark:via-transparent dark:to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 dark:bg-cyber-950/90 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/30 shadow-sm">
                    {wideFact.categoryName}
                  </div>
                </div>

                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-emerald-700 dark:text-neon mb-2">
                      <span className="font-semibold">PANORAMIC FEATURE // #03</span>
                      <span>•</span>
                      <span>{wideFact.statHighlight?.value}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-electric transition-colors leading-snug">
                      <Link href={`/article/${wideFact.slug}`}>{wideFact.title}</Link>
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                      {wideFact.hook}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10">
                    <div className="text-xs text-slate-500 font-mono">
                      {wideFact.readTime} • {wideFact.views} reads
                    </div>

                    <Link
                      href={`/article/${wideFact.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-600 hover:text-white dark:hover:bg-neon dark:hover:text-black hover:shadow-md transition-all"
                    >
                      <span>Explore Discovery</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </ThreeDCard>
          </div>

          {/* 4 & 5. TWO COMPACT CARDS (Span 6 cols each on LG) */}
          <div className="lg:col-span-6">
            <FactCard fact={compactFact1} index={4} onQuickView={onQuickView} />
          </div>
          <div className="lg:col-span-6">
            <FactCard fact={compactFact2} index={5} onQuickView={onQuickView} />
          </div>
        </div>
      </div>
    </section>
  );
};
