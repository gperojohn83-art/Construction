import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // BuildFlow design tokens
        bg: "#0d0f14",
        surface: "#151820",
        surface2: "#1c2030",
        border: "#252a3a",
        accent: {
          DEFAULT: "#f5a623",
          foreground: "#000000",
        },
        primary: {
          DEFAULT: "#3d7fff",
          foreground: "#ffffff",
        },
        success: "#2de08e",
        danger: "#ff4d6d",
        muted: {
          DEFAULT: "#6b7490",
          foreground: "#e8eaf0",
        },
        // shadcn/ui compatibility
        background: "#0d0f14",
        foreground: "#e8eaf0",
        card: { DEFAULT: "#151820", foreground: "#e8eaf0" },
        popover: { DEFAULT: "#151820", foreground: "#e8eaf0" },
        secondary: { DEFAULT: "#1c2030", foreground: "#e8eaf0" },
        destructive: { DEFAULT: "#ff4d6d", foreground: "#ffffff" },
        input: "#252a3a",
        ring: "#3d7fff",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        lg: "14px",
        md: "10px",
        sm: "8px",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease both",
        "fade-in": "fade-in 0.3s ease both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
