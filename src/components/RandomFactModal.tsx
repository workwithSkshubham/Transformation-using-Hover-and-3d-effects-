"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Fact } from "@/types";
import confetti from "canvas-confetti";
import {
  Sparkles,
  X,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Clock,
  Dna,
} from "lucide-react";

interface RandomFactModalProps {
  isOpen: boolean;
  onClose: () => void;
  facts: Fact[];
}

export const RandomFactModal: React.FC<RandomFactModalProps> = ({
  isOpen,
  onClose,
  facts,
}) => {
  const [selectedFact, setSelectedFact] = useState<Fact | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const scanRandomFact = () => {
    setIsScanning(true);
    let counter = 0;
    const interval = setInterval(() => {
      const randomCandidate = facts[Math.floor(Math.random() * facts.length)];
      setSelectedFact(randomCandidate);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setIsScanning(false);
        // Trigger celebratory cyber confetti
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ["#00f0ff", "#00ff66", "#ffffff"],
          });
        } catch {
          // ignore
        }
      }
    }, 120);
  };

  useEffect(() => {
    if (isOpen) {
      scanRandomFact();
    }
  }, [isOpen]);

  if (!isOpen || !selectedFact) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Random Fact Scanner"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl bg-cyber-950 border border-emerald-500/40 shadow-neon-green overflow-hidden p-6 sm:p-8"
      >
        {/* Header HUD Strip */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-neon font-semibold">
            <Dna className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>NEXUS RANDOM FACT SCANNER</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Fact Media Preview */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-5 border border-white/10">
          <Image
            src={selectedFact.imageUrl}
            alt={selectedFact.title}
            fill
            sizes="500px"
            className={`object-cover transition-opacity duration-200 ${
              isScanning ? "opacity-40 filter blur-xs" : "opacity-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-950 via-transparent to-transparent" />

          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center bg-cyber-950/50 backdrop-blur-xs font-mono text-xs text-electric">
              <RefreshCw className="w-6 h-6 animate-spin text-neon mr-2" />
              <span>INTERROGATING QUANTUM ARCHIVE...</span>
            </div>
          )}

          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-cyber-950/90 text-xs font-mono text-cyan-300 border border-cyan-500/30">
            {selectedFact.categoryName}
          </div>
        </div>

        {/* Fact Content */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-neon" />
            <span>Source: {selectedFact.source}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-3 leading-snug">
            {selectedFact.title}
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed">
            {selectedFact.hook}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-3">
          <button
            onClick={scanRandomFact}
            disabled={isScanning}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-cyber-900 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
            <span>Scan Another</span>
          </button>

          <Link
            href={`/article/${selectedFact.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-neon-blue hover:shadow-neon-green transition-all"
          >
            <span>Read Full Fact</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
