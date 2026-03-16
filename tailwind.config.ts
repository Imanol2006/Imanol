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
          DEFAULT: "#050608",
          soft: "#0b0d11"
        },
        accent: {
          DEFAULT: "#8fc2ff",
          soft: "rgba(143, 194, 255, 0.16)"
        }
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"]
      },
      boxShadow: {
        ambient: "0 28px 80px rgba(0, 0, 0, 0.34)",
        glow: "0 24px 80px rgba(118, 163, 255, 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
