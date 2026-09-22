import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cyber: {
          950: "#05070a",
          900: "#090d16",
          850: "#0d131f",
          800: "#121927",
          700: "#1a2436",
          600: "#24324a",
          500: "#344563",
        },
        electric: {
          DEFAULT: "#00f0ff",
          50: "#e0fcff",
          100: "#b3f8ff",
          200: "#80f3ff",
          300: "#4df0ff",
          400: "#1aedff",
          500: "#00f0ff",
          600: "#00c4d1",
          700: "#009aa3",
          800: "#007078",
          900: "#00474c",
        },
        neon: {
          DEFAULT: "#00ff66",
          50: "#e6ffed",
          100: "#bfffcc",
          200: "#80ffa3",
          300: "#40ff7a",
          400: "#00ff66",
          500: "#00e65c",
          600: "#00b347",
          700: "#008033",
          800: "#004d1f",
          900: "#00260f",
        },
      },
      boxShadow: {
        "neon-blue": "0 0 20px -3px rgba(0, 240, 255, 0.35)",
        "neon-blue-lg": "0 0 35px -3px rgba(0, 240, 255, 0.45)",
        "neon-green": "0 0 20px -3px rgba(0, 255, 102, 0.35)",
        "neon-green-lg": "0 0 35px -3px rgba(0, 255, 102, 0.45)",
        "cyber-glow": "0 0 50px -10px rgba(0, 240, 255, 0.15), 0 0 30px -10px rgba(0, 255, 102, 0.1)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
        "glow-ping": "glowPing 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        glowPing: {
          "75%, 100%": {
            transform: "scale(1.8)",
            opacity: "0",
          },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
