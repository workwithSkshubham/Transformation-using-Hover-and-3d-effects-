"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Fact } from "@/types";
import { Search, X, Sparkles, ArrowRight, Clock, Hash, CornerDownLeft } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  facts: Fact[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  facts,
}) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keydown listener for Ctrl+K / Cmd+K and ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open triggered by parent if wired, or handles self
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input on modal open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filtered facts based on query and category
  const results = facts.filter((fact) => {
    const matchesCategory =
      activeCategory === "all" || fact.category === activeCategory;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesText =
      fact.title.toLowerCase().includes(q) ||
      fact.hook.toLowerCase().includes(q) ||
      fact.summary.toLowerCase().includes(q) ||
      fact.categoryName.toLowerCase().includes(q) ||
      fact.tags.some((tag) => tag.toLowerCase().includes(q));

    return matchesCategory && matchesText;
  });

  // Handle arrow key navigation in search list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      window.location.href = `/article/${results[selectedIndex].slug}`;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search facts command palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl bg-cyber-950 border border-cyan-500/40 shadow-cyber-glow overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Futuristic Search Header & Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-cyber-900/50">
          <Search className="w-5 h-5 text-cyan-400 mr-3 animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search verified facts, quantum anomalies, space, biology..."
            className="w-full bg-transparent text-sm sm:text-base text-foreground placeholder:text-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-slate-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-lg border border-white/10 text-xs font-mono text-slate-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Quick Category Filters */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-cyber-950/60 overflow-x-auto scrollbar-none">
          {["all", "science-physics", "deep-space", "technology-ai", "history-civilization"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-cyan-500/20 text-electric border border-cyan-500/40"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat === "all" ? "All Domains" : cat.replace("-", " ")}
              </button>
            )
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-white/5">
          {results.length > 0 ? (
            results.map((fact, index) => {
              const isSelected = index === selectedIndex;
              return (
                <Link
                  key={fact.id}
                  href={`/article/${fact.slug}`}
                  onClick={onClose}
                  className={`flex items-start justify-between gap-4 p-3.5 rounded-xl transition-all ${
                    isSelected
                      ? "bg-cyan-500/15 border border-cyan-500/30 text-white"
                      : "hover:bg-white/5 text-slate-300"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-900 border border-white/10 text-cyan-300">
                        {fact.categoryName}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {fact.readTime}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-foreground leading-snug line-clamp-1">
                      {fact.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {fact.hook}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 self-center">
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-electric bg-cyan-500/20 px-1.5 py-0.5 rounded">
                        <CornerDownLeft className="w-3 h-3" /> Select
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-400 font-mono text-xs">
              <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2 animate-pulse" />
              <p>NO VERIFIED TELEMETRY FOUND MATCHING &ldquo;{query}&rdquo;</p>
              <p className="text-slate-600 mt-1">Try querying &ldquo;quantum&rdquo;, &ldquo;space&rdquo;, &ldquo;brain&rdquo;, or &ldquo;tardigrades&rdquo;</p>
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="px-4 py-2.5 border-t border-white/10 bg-cyber-950/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>{results.length} telemetry entries found</span>
        </div>
      </div>
    </div>
  );
};
