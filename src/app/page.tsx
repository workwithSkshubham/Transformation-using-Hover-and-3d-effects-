"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FactOfTheDay } from "@/components/FactOfTheDay";
import { PopularFacts } from "@/components/PopularFacts";
import { CategoryGrid } from "@/components/CategoryGrid";
import { LatestFacts } from "@/components/LatestFacts";
import { Footer } from "@/components/Footer";
import { SearchModal } from "@/components/SearchModal";
import { RandomFactModal } from "@/components/RandomFactModal";
import { QuickViewModal } from "@/components/QuickViewModal";
import { FACTS } from "@/data/facts";
import { Fact, Category } from "@/types";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRandomOpen, setIsRandomOpen] = useState(false);
  const [quickViewFact, setQuickViewFact] = useState<Fact | null>(null);

  const factOfTheDay = FACTS.find((f) => f.isFactOfTheDay) || FACTS[0];

  const handleSelectCategory = (category: Category) => {
    // Smooth scroll to latest facts and activate category filter
    const el = document.getElementById("latest-facts");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* GLOBAL NAVBAR */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenRandom={() => setIsRandomOpen(true)}
      />

      {/* MAIN CONTENT REGION */}
      <main className="flex-grow">
        {/* HERO SECTION */}
        <Hero onOpenSearch={() => setIsSearchOpen(true)} />

        {/* FACT OF THE DAY HUD */}
        <FactOfTheDay fact={factOfTheDay} />

        {/* POPULAR FACTS BENTO GRID */}
        <PopularFacts
          facts={FACTS}
          onQuickView={(fact) => setQuickViewFact(fact)}
        />

        {/* 11 CATEGORY MATRICES */}
        <CategoryGrid onSelectCategory={handleSelectCategory} />

        {/* LATEST FACTS STREAM */}
        <LatestFacts
          facts={FACTS}
          onQuickView={(fact) => setQuickViewFact(fact)}
        />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* MODALS */}
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

      <QuickViewModal
        fact={quickViewFact}
        onClose={() => setQuickViewFact(null)}
      />
    </div>
  );
}
