"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "./SectionHeading";
import { CategoryCard } from "./CategoryCard";
import { CATEGORIES } from "@/data/categories";
import { Category } from "@/types";

interface CategoryGridProps {
  onSelectCategory?: (category: Category) => void;
  activeCategorySlug?: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  activeCategorySlug,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      gsap.from(gridRef.current.children, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="categories" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="KNOWLEDGE MATRICES"
          title="Explore Fact Fields"
          subtitle="Navigate across eleven specialized domains of empirical human inquiry and universal phenomena."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
        >
          {CATEGORIES.map((category) => (
            <div key={category.id} className="h-full">
              <CategoryCard
                category={category}
                isActive={activeCategorySlug === category.slug}
                onClick={onSelectCategory ? () => onSelectCategory(category) : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
