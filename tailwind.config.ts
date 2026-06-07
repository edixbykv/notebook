import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        paper: "#F8F5EE",
        "paper-deep": "#F1ECDF",
        ink: "#111111",
        "ink-soft": "#3A3A3A",
        marker: "#E53935",
        "marker-deep": "#C62828",
        sticky: "#FFF176",
        "sticky-deep": "#FFE54C",
        accent: "#000000",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        hand: ["var(--font-caveat)", "cursive"],
        marker: ["var(--font-permanent)", "cursive"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        sticky: "2px 6px 18px rgba(17,17,17,0.18)",
        "sticky-hover": "6px 14px 30px rgba(17,17,17,0.24)",
        paper: "0 1px 2px rgba(17,17,17,0.06), 0 8px 30px rgba(17,17,17,0.08)",
        "paper-lift":
          "0 2px 4px rgba(17,17,17,0.08), 0 18px 50px rgba(17,17,17,0.16)",
        marker: "0 2px 0 rgba(229,57,53,0.25)",
        pin: "0 4px 8px rgba(0,0,0,0.25)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--tw-rotate))" },
          "50%": { transform: "translateY(-8px) rotate(var(--tw-rotate))" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        wiggle: "wiggle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
