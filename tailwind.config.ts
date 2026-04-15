import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#000000",
          soft: "#0a0a0a"
        },
        accent: {
          DEFAULT: "#0071e3",
          soft: "rgba(0, 113, 227, 0.12)"
        }
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"]
      },
      boxShadow: {
        ambient: "0 28px 80px rgba(0, 0, 0, 0.60)",
        glow: "0 24px 80px rgba(0, 113, 227, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
