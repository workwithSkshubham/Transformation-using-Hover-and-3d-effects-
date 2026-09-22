"use client";

import React, { useRef, useState, useEffect } from "react";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // max tilt angle in degrees, default 10
  depth?: number; // visual translateZ depth, default 30
  glareEffect?: boolean;
  borderGlow?: "blue" | "green" | "none";
  onClick?: () => void;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({
  children,
  className = "",
  maxRotation = 8,
  depth = 24,
  glareEffect = true,
  borderGlow = "blue",
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (-1 to 1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Calculate rotation angles (tilting subtly toward cursor direction)
    const nextRotateY = Math.max(-maxRotation, Math.min(maxRotation, mouseX * maxRotation));
    const nextRotateX = Math.max(-maxRotation, Math.min(maxRotation, -mouseY * maxRotation));

    setRotateX(nextRotateX);
    setRotateY(nextRotateY);

    // Dynamic glare coordinates (percentage)
    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.25 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  const glowClass =
    borderGlow === "blue"
      ? "hover:border-blue-500/50 dark:hover:border-cyan-400/60 shadow-[0_6px_25px_-4px_rgba(15,23,42,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.22)] dark:shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)] dark:hover:shadow-neon-blue"
      : borderGlow === "green"
      ? "hover:border-emerald-500/50 dark:hover:border-emerald-400/60 shadow-[0_6px_25px_-4px_rgba(15,23,42,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.22)] dark:shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)] dark:hover:shadow-neon-green"
      : "hover:border-slate-400/50 shadow-[0_6px_25px_-4px_rgba(15,23,42,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(15,23,42,0.18)] dark:shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)]";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative perspective-1000 select-none ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{ perspective: "1200px" }}
    >
      <div
        className={`relative w-full h-full rounded-2xl border transition-all ease-out duration-200 preserve-3d glass-panel ${glowClass}`}
        style={{
          transform: prefersReducedMotion
            ? "none"
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
                isHovered
                  ? "translateY(-8px) translateZ(16px) scale3d(1.025, 1.025, 1.025)"
                  : "translateY(0px) translateZ(0px)"
              }`,
          transformStyle: "preserve-3d",
          transition: isHovered
            ? "transform 0.12s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out"
            : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease-out",
        }}
      >
        {/* Dynamic Holographic Glare Overlay */}
        {glareEffect && !prefersReducedMotion && (
          <div
            className="pointer-events-none absolute inset-0 z-30 rounded-2xl transition-opacity duration-300 overflow-hidden"
            style={{
              background: `radial-gradient(circle 340px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${
                glarePosition.opacity * 0.7
              }), rgba(37, 99, 235, ${glarePosition.opacity * 0.35}) 40%, transparent 70%)`,
            }}
          />
        )}

        {/* Ambient Top Edge Lighting */}
        <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400/50 dark:via-cyan-400/60 to-transparent" />

        {/* Card Content with Enhanced 3D Depth */}
        <div
          className="relative z-10 w-full h-full preserve-3d"
          style={{ transform: `translateZ(${isHovered ? depth : 0}px)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
