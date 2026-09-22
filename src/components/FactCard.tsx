"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Fact } from "@/types";
import { ThreeDCard } from "./ThreeDCard";
import { Clock, CheckCircle2, ArrowRight, Eye, Heart, Sparkles } from "lucide-react";

interface FactCardProps {
  fact: Fact;
  index?: number;
  featured?: boolean;
  onQuickView?: (fact: Fact) => void;
}

export const FactCard: React.FC<FactCardProps> = ({
  fact,
  index = 1,
  featured = false,
  onQuickView,
}) => {
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <ThreeDCard
      depth={30}
      maxRotation={8}
      borderGlow={featured ? "green" : "blue"}
      className="h-full flex flex-col group"
    >
      <div className="relative flex flex-col h-full rounded-2xl overflow-hidden p-5 sm:p-6 bg-white dark:bg-cyber-900/90 border border-slate-200/80 dark:border-white/10 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] dark:shadow-none transition-colors duration-300">
        {/* Subtle decorative background gradient accent */}
        <div className="pointer-events-none absolute -right-16 -top-16 w-36 h-36 rounded-full bg-blue-500/5 dark:bg-cyan-500/15 blur-2xl group-hover:bg-blue-500/15 dark:group-hover:bg-cyan-400/25 transition-all duration-500" />

        {/* TOP LAYER: Visual Media & Floating Pop Badges */}
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-cyber-950/80 border border-slate-200/80 dark:border-white/5">
          <Image
            src={fact.imageUrl}
            alt={fact.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:rotate-0.5"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent dark:from-cyber-950/90 dark:via-cyber-950/30 dark:to-transparent" />

          {/* Floating Category Badge (Z-Index Layer 1) */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 dark:bg-cyber-950/90 border border-blue-500/30 dark:border-cyan-500/30 text-blue-600 dark:text-cyan-400 text-xs font-semibold tracking-wide shadow-sm backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-emerald-500 dark:text-neon animate-pulse" />
            <span>{fact.categoryName}</span>
          </div>

          {/* Fact Sequence Number (Z-Index Layer 1) */}
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-lg bg-white/95 dark:bg-cyber-950/85 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold shadow-sm backdrop-blur-md">
            #{formattedIndex}
          </div>

          {/* Verified Badge & Read Time Overlay (Bottom of Image) */}
          <div className="absolute bottom-2.5 left-3 right-3 z-20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 bg-white/95 dark:bg-cyber-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30 shadow-sm backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] uppercase tracking-wider font-medium">Verified</span>
            </div>
            <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 bg-white/95 dark:bg-cyber-950/80 px-2 py-0.5 rounded-md border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-sm">
              <Clock className="w-3 h-3 text-blue-500 dark:text-cyan-400" />
              <span className="font-mono text-[11px]">{fact.readTime}</span>
            </div>
          </div>
        </div>

        {/* MIDDLE LAYER: Content & Hook */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-electric transition-colors duration-200">
              <Link href={`/article/${fact.slug}`} className="focus:outline-none">
                {fact.title}
              </Link>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
              {fact.hook}
            </p>
          </div>

          {/* Stat Highlight if present */}
          {fact.statHighlight && (
            <div className="mb-4 px-3 py-2 rounded-xl bg-blue-50 dark:bg-cyan-950/40 border border-blue-200/60 dark:border-cyan-500/20 flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-mono uppercase tracking-wider">
                {fact.statHighlight.label}
              </span>
              <span className="text-sm font-mono font-bold text-blue-600 dark:text-electric">
                {fact.statHighlight.value}
              </span>
            </div>
          )}

          {/* BOTTOM LAYER: Author & Interactive Action Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-blue-500/40 dark:ring-cyan-500/40">
                <Image
                  src={fact.author.avatar}
                  alt={fact.author.name}
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <div className="text-xs">
                <span className="block font-medium text-foreground leading-tight">
                  {fact.author.name}
                </span>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                  {fact.date}
                </span>
              </div>
            </div>

            {/* Hover Action CTA */}
            <div className="flex items-center gap-2">
              {onQuickView && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onQuickView(fact);
                  }}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:border-blue-400 dark:hover:border-cyan-400/50 transition-colors"
                  title="Quick View"
                  aria-label="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}
              <Link
                href={`/article/${fact.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide bg-blue-50 dark:bg-cyan-500/10 text-blue-600 dark:text-electric border border-blue-200 dark:border-cyan-500/30 hover:bg-blue-600 hover:text-white dark:hover:bg-electric dark:hover:text-black hover:shadow-md transition-all duration-300"
              >
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ThreeDCard>
  );
};
