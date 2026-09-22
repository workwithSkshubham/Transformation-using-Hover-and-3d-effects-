"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import {
  Dna,
  ArrowUp,
  Sparkles,
  Check,
  Send,
  Shield,
  BookOpen,
  Cpu,
} from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-cyber-950 border-t border-white/10 pt-20 pb-12 overflow-hidden text-slate-400">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-gradient-to-t from-cyan-500/10 via-emerald-500/5 to-transparent blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-neon-blue">
                <div className="w-full h-full rounded-[10px] bg-cyber-950 flex items-center justify-center">
                  <Dna className="w-5 h-5 text-electric" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                THE FACT SITE <span className="text-electric text-xs font-mono font-normal">// 3D</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              A high-precision futuristic editorial platform curating mind-expanding empirical
              truths, quantum anomalies, and universal insights for curious minds worldwide.
            </p>

            {/* Newsletter Terminal Box */}
            <div className="p-4 rounded-2xl bg-cyber-900/60 border border-white/10">
              <div className="text-xs font-mono text-cyan-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-neon" />
                <span>DAILY TELEMETRY DISPATCH</span>
              </div>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-mono text-neon py-2">
                  <Check className="w-4 h-4" />
                  <span>TRANSMISSION SYNCHRONIZED. WELCOME ABOARD.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="explorer@domain.com"
                    required
                    className="flex-1 bg-cyber-950 px-3 py-2 rounded-xl text-xs text-white border border-white/10 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-electric text-black text-xs font-semibold hover:shadow-neon-blue transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* QUICK CATEGORIES COLUMN */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-4">
                Core Disciplines
              </h4>
              <ul className="space-y-2.5 text-xs">
                {CATEGORIES.slice(0, 6).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="hover:text-electric transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-4">
                Specialized Fields
              </h4>
              <ul className="space-y-2.5 text-xs">
                {CATEGORIES.slice(6).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="hover:text-neon transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* TELEMETRY & ARCHIVE COLUMN */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-4">
                System Standards
              </h4>
              <ul className="space-y-3 text-xs">
                <li className="flex items-center gap-2 text-slate-400">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>100% Peer-Reviewed Verification</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>GSAP 3D Interactive Kernel</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>Open Educational Repository</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 bg-cyber-900 border border-white/10 hover:text-white hover:border-cyan-400 transition-all"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>RETURN TO ORBIT</span>
              </button>
            </div>
          </div>
        </div>

        {/* DISCLAIMER & COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>
            © {new Date().getFullYear()} The Fact Site — Futuristic 3D Redesign. Built for
            Portfolio & Educational Demonstration.
          </p>
          <p className="text-slate-600">
            Inspired by{" "}
            <a
              href="https://www.thefactsite.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 underline underline-offset-2"
            >
              The Fact Site
            </a>
            . Independent conceptual design.
          </p>
        </div>
      </div>
    </footer>
  );
};
