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
        ink: "#172033",
        mint: {
          50: "#effdf8",
          100: "#d8f8ed",
          500: "#1fc999",
          600: "#13a87e",
          700: "#0f8466",
        },
        cloud: "#f6f8fb",
      },
      boxShadow: {
        soft: "0 22px 70px rgba(23, 32, 51, 0.11)",
        line: "0 1px 0 rgba(23, 32, 51, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
