"use client";

import React from "react";
import Link from "next/link";
import { Category } from "@/types";
import { ThreeDCard } from "./ThreeDCard";
import {
  Atom,
  Telescope,
  Cpu,
  Hourglass,
  Leaf,
  Dna,
  BrainCircuit,
  Globe,
  Utensils,
  Sparkles,
  Flame,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface CategoryCardProps {
  category: Category;
  isActive?: boolean;
  onClick?: () => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Atom,
  Telescope,
  Cpu,
  Hourglass,
  Leaf,
  Dna,
  BrainCircuit,
  Globe,
  Utensils,
  Sparkles,
  Flame,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isActive = false,
  onClick,
}) => {
  const IconComponent = ICON_MAP[category.iconName] || Sparkles;

  return (
    <ThreeDCard
      depth={20}
      maxRotation={8}
      borderGlow="blue"
      onClick={onClick}
      className="h-full group"
    >
      <div
        className={`relative flex flex-col justify-between h-full p-5 sm:p-6 rounded-2xl border transition-all duration-300 overflow-hidden ${
          isActive
            ? "border-blue-500/80 bg-blue-50/80 dark:border-cyan-400/80 dark:bg-cyan-950/40 shadow-[0_10px_30px_-5px_rgba(37,99,235,0.2)] dark:shadow-neon-blue"
            : "border-slate-200/80 dark:border-white/10 bg-white dark:bg-cyber-900/80 hover:border-blue-400/50 dark:hover:border-cyan-500/40 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] dark:shadow-none"
        }`}
      >
        {/* Ambient Top Subtle Gradient Light */}
        <div
          className={`pointer-events-none absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${category.gradient} blur-xl group-hover:scale-150 transition-transform duration-500 opacity-60 dark:opacity-80`}
        />

        <div>
          {/* Header with Icon and Fact Count */}
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-cyber-950/80 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm"
              style={{ color: category.accentColor }}
            >
              <IconComponent className="w-6 h-6" />
            </div>

            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-cyber-950/80 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-electric transition-colors">
              {category.factCount.toLocaleString()} Facts
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-foreground tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-electric transition-colors">
            {category.name}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {category.description}
          </p>
        </div>

        {/* Action Link Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold">
          <Link
            href={`/category/${category.slug}`}
            className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-electric transition-colors"
          >
            <span>Explore Hub</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>

          <span
            className="w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm"
            style={{ backgroundColor: category.accentColor }}
          />
        </div>
      </div>
    </ThreeDCard>
  );
};
