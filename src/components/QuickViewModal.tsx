"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Fact } from "@/types";
import { X, ArrowRight, ShieldCheck, Clock, Eye, Sparkles } from "lucide-react";

interface QuickViewModalProps {
  fact: Fact | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ fact, onClose }) => {
  if (!fact) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fact Quick View"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-3xl bg-cyber-950 border border-cyan-500/40 shadow-neon-blue overflow-hidden p-6 sm:p-8"
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Eye className="w-4 h-4" />
            <span>QUICK TELEMETRY VIEW</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg border border-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-5 border border-white/10">
          <Image
            src={fact.imageUrl}
            alt={fact.title}
            fill
            sizes="500px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-950 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-cyber-950/90 text-xs font-mono text-cyan-300 border border-cyan-500/30">
            {fact.categoryName}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-2">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> {fact.readTime}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-foreground mb-3 leading-snug">
          {fact.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {fact.hook}
        </p>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 border-l border-cyan-500/40 pl-3">
          {fact.summary}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-xs font-mono text-slate-500">By {fact.author.name}</span>
          <Link
            href={`/article/${fact.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-neon-blue hover:shadow-neon-green transition-all"
          >
            <span>Full Article Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
