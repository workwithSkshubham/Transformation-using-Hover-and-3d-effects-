"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getArticleBySlug } from "@/data/articles";
import { FACTS } from "@/data/facts";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FactCard } from "@/components/FactCard";
import { SearchModal } from "@/components/SearchModal";
import { RandomFactModal } from "@/components/RandomFactModal";
import {
  Clock,
  Calendar,
  Share2,
  Check,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Bookmark,
  BookOpen,
} from "lucide-react";

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = getArticleBySlug(slug);

  const [copied, setCopied] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRandomOpen, setIsRandomOpen] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleTwitterShare = () => {
    if (typeof window === "undefined") return;
    const text = encodeURIComponent(`Fascinating discovery: "${article.title}"`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleLinkedinShare = () => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const relatedFacts = FACTS.filter((f) =>
    article.relatedFactSlugs.includes(f.slug)
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* READING PROGRESS BAR AT VIEWPORT TOP */}
      <ReadingProgressBar />

      {/* NAVBAR */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenRandom={() => setIsRandomOpen(true)}
      />

      <main className="flex-grow pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* BREADCRUMB */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>HOME</span>
            </Link>
            <span>/</span>
            <Link
              href={`/category/${article.category}`}
              className="hover:text-cyan-400 transition-colors uppercase"
            >
              {article.categoryName}
            </Link>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-[200px] sm:max-w-none">
              {article.title}
            </span>
          </nav>

          {/* CATEGORY & METADATA BADGE */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-cyan-500/15 text-electric border border-cyan-500/30">
              {article.categoryName}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>EMPIRICALLY VERIFIED</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* LARGE TITLE & SUBTITLE */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.12] mb-4">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-normal">
            {article.subtitle}
          </p>

          {/* AUTHOR & SHARE STRIP */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-8 border-y border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-cyan-500/40">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">
                  {article.author.name}
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {article.author.role} • {article.publishedDate}
                </div>
              </div>
            </div>

            {/* Social Share Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleTwitterShare}
                aria-label="Share on X / Twitter"
                title="Share on X / Twitter"
                className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                onClick={handleLinkedinShare}
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
                className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </button>
              <button
                onClick={handleCopyLink}
                aria-label="Copy link"
                title="Copy link"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 text-xs font-mono text-slate-300 hover:border-cyan-400 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-neon" />
                    <span className="text-neon">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-3 border border-white/10 shadow-2xl">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-10 text-center">
            {article.imageCaption}
          </p>

          {/* KEY TAKEAWAYS CALLOUT BOX */}
          <div className="p-6 sm:p-8 rounded-2xl bg-cyan-950/20 dark:bg-cyan-950/40 border border-cyan-500/30 mb-12 shadow-neon-blue">
            <div className="flex items-center gap-2 text-xs font-mono text-electric font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4 text-neon" />
              <span>EXECUTIVE KNOWLEDGE SUMMARY</span>
            </div>
            <ul className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-200">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* EDITORIAL ARTICLE SECTIONS */}
          <div className="prose prose-slate dark:prose-invert max-w-none mb-14">
            {article.sections.map((section, idx) => (
              <div key={idx} className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-4">
                  {section.heading}
                </h2>
                {section.content.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 font-normal"
                  >
                    {p}
                  </p>
                ))}

                {section.quote && (
                  <blockquote className="my-6 p-5 rounded-xl border-l-4 border-cyan-400 bg-cyber-900/40 text-base sm:text-lg font-medium text-slate-200 italic">
                    {section.quote}
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          {/* DID YOU KNOW BREAKDOWN */}
          <div className="mb-14">
            <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mb-6">
              Deep Telemetry & Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.didYouKnowBreakdowns.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-cyber-900/60 border border-white/10"
                >
                  <div className="text-xs font-mono text-neon uppercase font-semibold mb-2">
                    {item.point}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SOURCES & ATTRIBUTIONS */}
          <div className="p-6 rounded-xl border border-white/10 bg-cyber-950/60 mb-16">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Verified Archival Citations</span>
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              {article.sources.map((src, idx) => (
                <li key={idx}>
                  • {src.name} — <span className="text-slate-300">{src.publication}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RELATED FACTS SECTION */}
          {relatedFacts.length > 0 && (
            <div className="pt-12 border-t border-white/10">
              <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-8">
                Explore Related Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedFacts.map((relFact, idx) => (
                  <FactCard key={relFact.id} fact={relFact} index={idx + 1} />
                ))}
              </div>
            </div>
          )}
        </article>
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
