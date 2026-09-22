import React from "react";

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = "left",
  action,
}) => {
  return (
    <div
      className={`mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4 ${
        align === "center" ? "text-center md:text-center items-center" : "text-left"
      }`}
    >
      <div className={align === "center" ? "max-w-2xl mx-auto" : "max-w-3xl"}>
        {/* Futuristic Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-electric text-xs font-mono tracking-widest uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-ping" />
          <span>{badge}</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};
