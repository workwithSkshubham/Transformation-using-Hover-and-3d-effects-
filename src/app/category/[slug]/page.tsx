"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { FACTS } from "@/data/facts";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FactCard } from "@/components/FactCard";
import { SearchModal } from "@/components/SearchModal";
import { RandomFactModal } from "@/components/RandomFactModal";
import { ArrowLeft, Sparkles, Layers } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRandomOpen, setIsRandomOpen] = useState(false);

  const category =
    CATEGORIES.find((c) => c.slug === slug) || CATEGORIES[0];

  const categoryFacts = FACTS.filter((f) => f.category === category.slug);
  const otherCategories = CATEGORIES.filter((c) => c.slug !== category.slug);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenRandom={() => setIsRandomOpen(true)}
      />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>HOME</span>
            </Link>
            <span>/</span>
            <span className="text-slate-400 uppercase">CATEGORIES</span>
            <span>/</span>
            <span className="text-cyan-400 uppercase">{category.name}</span>
          </nav>

          {/* Category Header Hero */}
          <div className="relative p-8 sm:p-12 rounded-3xl overflow-hidden bg-cyber-900/60 dark:bg-cyber-900/80 border border-white/10 mb-14 shadow-2xl">
            <div
              className={`pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br ${category.gradient} blur-3xl opacity-60`}
            />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-electric text-xs font-mono tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-neon" />
                <span>FIELD MATRIX // {category.factCount.toLocaleString()} VERIFIED INSIGHTS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight mb-4">
                {category.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>

          {/* Category Facts Grid */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Documented Field Insights ({categoryFacts.length})
              </h2>
              <span className="text-xs font-mono text-slate-500">Real-Time Scientific Telemetry</span>
            </div>

            {categoryFacts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {categoryFacts.map((fact, index) => (
                  <FactCard key={fact.id} fact={fact} index={index + 1} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-slate-400 font-mono text-sm border border-dashed border-white/10 rounded-2xl">
                <p>TELEMETRY ARCHIVE SYNCHRONIZATION IN PROGRESS FOR THIS FIELD.</p>
                <p className="text-xs text-slate-600 mt-2">Check back shortly as our editorial board reviews pending discoveries.</p>
              </div>
            )}
          </div>

          {/* Other Categories Switcher */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Explore Other Disciplines</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {otherCategories.slice(0, 5).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="p-3.5 rounded-xl border border-white/10 bg-cyber-900/40 hover:bg-cyber-900/80 hover:border-cyan-400/40 text-xs font-medium text-slate-300 hover:text-electric transition-all"
                >
                  <span className="block truncate font-semibold">{cat.name}</span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {cat.factCount.toLocaleString()} Facts
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        facts={FACTS}
      />
      <RandomFactModal
        isOpen={isRandomOpen}
        onClose={() => setIsRandomOpen(false)}
        facts={FACTS}
      />
    </div>
  );
}
