import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080B12",
        navy: "#0E1624",
        panel: "#111827",
        "panel-soft": "#172033",
        surface: "#F8FAF7",
        "surface-muted": "#EEF4EF",
        "text-main": "#0F172A",
        "text-muted": "#64748B",
        emerald: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          600: "#059669",
          700: "#047857",
        },
        cyan: {
          DEFAULT: "#22D3EE",
          50: "#ECFEFF",
          100: "#CFFAFE",
          300: "#67E8F9",
          600: "#0891B2",
        },
        amber: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
        },
        danger: {
          DEFAULT: "#EF4444",
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          700: "#B91C1C",
        },
        mint: {
          50: "#ECFDF7",
          100: "#D6FBEA",
          500: "#38D9A9",
          600: "#10B981",
          700: "#047857",
        },
        cloud: "#EEF4EF",
      },
      boxShadow: {
        soft: "0 22px 70px rgba(8, 11, 18, 0.12)",
        line: "0 1px 0 rgba(8, 11, 18, 0.08)",
        crisp: "0 18px 52px rgba(8, 11, 18, 0.14)",
        command: "0 28px 90px rgba(8, 11, 18, 0.36)",
      },
    },
  },
  plugins: [],
};

export default config;
