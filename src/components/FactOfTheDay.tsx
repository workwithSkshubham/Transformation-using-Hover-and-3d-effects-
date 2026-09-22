"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Fact } from "@/types";
import {
  Radio,
  Volume2,
  VolumeX,
  Share2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

interface FactOfTheDayProps {
  fact: Fact;
}

export const FactOfTheDay: React.FC<FactOfTheDayProps> = ({ fact }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  // Web Speech API text-to-speech for futuristic immersion
  const toggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${fact.title}. ${fact.hook}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/article/${fact.slug}` : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Fact of the Day: ${fact.title}`,
          text: fact.hook,
          url: url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${fact.title} — ${fact.hook} | Read on The Fact Site 3D: ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="fact-of-the-day" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION INTRO */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/30 text-blue-600 dark:text-electric">
              <Radio className="w-5 h-5 animate-pulse text-blue-600 dark:text-electric" />
            </span>
            <div>
              <div className="text-xs font-mono font-semibold tracking-widest text-blue-600 dark:text-electric uppercase">
                DAILY KNOWLEDGE TELEMETRY
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Fact of the Day
              </h2>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-cyber-900/60 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-neon" />
            <span>{fact.date}</span>
          </div>
        </div>

        {/* OPEN HUD CONTROL PANEL */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-r from-blue-500/30 via-emerald-500/20 to-indigo-500/30 dark:from-cyan-500/40 dark:via-emerald-500/30 dark:to-blue-500/40 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.1)] dark:shadow-cyber-glow">
          <div className="relative rounded-[22px] overflow-hidden bg-white dark:bg-cyber-950 p-6 sm:p-10 lg:p-12 border border-slate-200/80 dark:border-white/10">
            {/* Corner Brackets */}
            <div className="pointer-events-none absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-blue-500 dark:border-cyan-400" />
            <div className="pointer-events-none absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-blue-500 dark:border-cyan-400" />
            <div className="pointer-events-none absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-emerald-500 dark:border-emerald-400" />
            <div className="pointer-events-none absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald-500 dark:border-emerald-400" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* LEFT: Imagery & Soundwave Visualizer preview */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-cyan-500/30 shadow-lg">
                  <Image
                    src={fact.imageUrl}
                    alt={fact.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent dark:from-cyber-950/90 dark:via-cyber-950/20 dark:to-transparent" />

                  {/* Soundwave Animation Overlay when playing */}
                  {isPlayingAudio && (
                    <div className="absolute inset-0 bg-slate-900/60 dark:bg-cyber-950/60 backdrop-blur-xs flex items-center justify-center gap-1.5 px-6">
                      <span className="w-1.5 h-8 bg-blue-400 dark:bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-14 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-6 bg-blue-400 dark:bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      <span className="w-1.5 h-12 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "450ms" }} />
                      <span className="w-1.5 h-9 bg-blue-400 dark:bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "600ms" }} />
                    </div>
                  )}

                  {/* Floating category tag */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-white/95 dark:bg-cyber-950/90 border border-blue-500/30 dark:border-cyan-500/40 text-blue-600 dark:text-cyan-300 text-xs font-semibold shadow-sm">
                    {fact.categoryName}
                  </div>

                  {/* Audio Narrator Control Button */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <button
                      onClick={toggleSpeech}
                      id="tts-narration-btn"
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all shadow-sm ${
                        isPlayingAudio
                          ? "bg-emerald-600 text-white dark:bg-neon dark:text-black shadow-md"
                          : "bg-white/95 dark:bg-cyber-950/90 text-blue-700 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/40 hover:bg-blue-50 dark:hover:bg-cyan-500/20"
                      }`}
                      title={isPlayingAudio ? "Stop Audio" : "Listen to Fact"}
                    >
                      {isPlayingAudio ? (
                        <>
                          <VolumeX className="w-4 h-4" />
                          <span>STOP NARRATION</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                          <span>LISTEN TO FACT</span>
                        </>
                      )}
                    </button>

                    <div className="text-[11px] font-mono text-white bg-black/60 dark:bg-cyber-950/80 px-2 py-1 rounded border border-white/20 backdrop-blur-sm">
                      {fact.readTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Fact Headline, Hook, Verification & Actions */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 text-xs font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-neon" />
                      <span>OFFICIALLY VERIFIED</span>
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Source: <span className="text-slate-700 dark:text-slate-300 font-medium">{fact.source}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-tight mb-4">
                    {fact.title}
                  </h3>

                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                    {fact.hook}
                  </p>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8 border-l-2 border-blue-500/40 dark:border-cyan-500/40 pl-4 py-0.5">
                    {fact.summary}
                  </p>
                </div>

                {/* Action Strip */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleShare}
                      id="share-fact-btn"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-cyber-900/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:border-blue-400 dark:hover:border-cyan-400 transition-all shadow-sm"
                      title="Share Fact"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-neon" />
                          <span className="text-emerald-600 dark:text-neon">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                          <span>Share Fact</span>
                        </>
                      )}
                    </button>

                    {fact.sourceUrl && (
                      <a
                        href={fact.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        <span>View Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/article/${fact.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400 text-white dark:text-black shadow-md hover:shadow-lg dark:shadow-neon-blue dark:hover:shadow-neon-green transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>Full Deep Dive</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
