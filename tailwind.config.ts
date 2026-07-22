import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a1628",
          50: "#0c1e36",
          100: "#0f2240",
          200: "#12284a",
          300: "#1a3a6a",
          400: "#1e4a8a",
        },
        peak: {
          gold: "#d4a843",
          "gold-light": "#e8c96a",
          "gold-dim": "#a07830",
          blue: "#1e4a8a",
          "blue-bright": "#2563eb",
          silver: "#c8c8c8",
          "silver-light": "#e8e8e8",
          "silver-dim": "#8a8a8a",
          orange: "#e85d04",
          "orange-light": "#ff7b00",
        },
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "scale-in": "scale-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
        "ken-burns": "ken-burns 8s ease-in-out infinite alternate",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.1) translate(-10px, -5px)" },
        },
      },
    },
  },
  plugins: [],
}
export default config
