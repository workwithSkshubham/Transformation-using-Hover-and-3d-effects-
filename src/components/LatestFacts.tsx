"use client";

import React, { useState, useMemo } from "react";
import { Fact, FactCategorySlug } from "@/types";
import { SectionHeading } from "./SectionHeading";
import { FactCard } from "./FactCard";
import { CATEGORIES } from "@/data/categories";
import { Filter, Layers, Sparkles } from "lucide-react";

interface LatestFactsProps {
  facts: Fact[];
  onQuickView: (fact: Fact) => void;
}

export const LatestFacts: React.FC<LatestFactsProps> = ({ facts, onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const filteredFacts = useMemo(() => {
    if (selectedCategory === "all") return facts;
    return facts.filter((f) => f.category === selectedCategory);
  }, [facts, selectedCategory]);

  const displayedFacts = filteredFacts.slice(0, visibleCount);

  return (
    <section id="latest-facts" className="py-24 relative overflow-hidden bg-cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="CONTINUOUS SYNAPSE STREAM"
          title="Latest Verified Facts"
          subtitle="Real-time telemetry and recent archival additions freshly verified by our science panel."
        />

        {/* CATEGORY FILTER PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          <button
            onClick={() => {
              setSelectedCategory("all");
              setVisibleCount(6);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 flex-shrink-0 ${
              selectedCategory === "all"
                ? "bg-blue-600 dark:bg-electric text-white dark:text-black shadow-md dark:shadow-neon-blue font-bold"
                : "bg-white dark:bg-cyber-900/80 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:border-blue-400 dark:hover:border-cyan-400/40 shadow-sm"
            }`}
          >
            All Fields ({facts.length})
          </button>

          {CATEGORIES.slice(0, 8).map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.slug);
                setVisibleCount(6);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 flex-shrink-0 ${
                selectedCategory === cat.slug
                  ? "bg-blue-600 dark:bg-electric text-white dark:text-black shadow-md dark:shadow-neon-blue font-bold"
                  : "bg-white dark:bg-cyber-900/80 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:border-blue-400 dark:hover:border-cyan-400/40 shadow-sm"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* CARD STREAM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedFacts.map((fact, index) => (
            <div key={fact.id} className="h-full">
              <FactCard
                fact={fact}
                index={index + 1}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        {visibleCount < filteredFacts.length && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              id="load-more-facts-btn"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase bg-white dark:bg-cyber-900/80 border border-blue-500/40 dark:border-cyan-500/40 text-blue-600 dark:text-electric hover:bg-blue-600 hover:text-white dark:hover:bg-electric dark:hover:text-black hover:shadow-lg dark:hover:shadow-neon-blue shadow-sm transition-all duration-300"
            >
              <Sparkles className="w-4 h-4" />
              <span>LOAD MORE FACTS ({filteredFacts.length - visibleCount} REMAINING)</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
