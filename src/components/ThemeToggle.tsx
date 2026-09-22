"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, Sparkles } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-xl bg-cyber-800/40 animate-pulse ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      id="theme-toggle-btn"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative group flex items-center justify-center p-2 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-electric focus:ring-offset-2 focus:ring-offset-background ${
        isDark
          ? "bg-cyber-900/80 border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:shadow-neon-blue"
          : "bg-white/90 border-slate-300 text-slate-700 hover:border-sky-500 hover:text-sky-600 hover:shadow-md"
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {/* Animated Sun / Moon transition */}
        <div
          className={`absolute transition-all duration-500 transform ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        >
          <Moon className="w-5 h-5 text-electric transition-transform group-hover:rotate-12" />
        </div>
        <div
          className={`absolute transition-all duration-500 transform ${
            !isDark
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        >
          <Sun className="w-5 h-5 text-amber-500 transition-transform group-hover:rotate-45" />
        </div>
      </div>

      {/* Cybernetic active badge indicator */}
      <span
        className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-background transition-colors duration-300 ${
          isDark ? "bg-neon shadow-neon-green" : "bg-sky-500"
        }`}
      />
    </button>
  );
};
