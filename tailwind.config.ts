import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        serif: ["Newsreader", "Georgia", '"Times New Roman"', "serif"],
        hand: ["Caveat", '"Bradley Hand"', '"Segoe Print"', "cursive"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        // The notebook: paper, pen inks and a highlighter.
        paper: { DEFAULT: "#F6F3EA", 2: "#EFEADD", card: "#FFFDF7" },
        graphite: { DEFAULT: "#1D2430", dim: "#4A5263", soft: "#7A8292" },
        biro: "#2B5BA8",
        redpen: "#C8412B",
        marker: "#F2A33A",
        rule: "rgba(43, 91, 168, 0.14)",
        // Dark stage colours, still used inside the project animations.
        ink: { DEFAULT: "#050506", 2: "#0F0F12", 3: "#17171C" },
        bone: { DEFAULT: "#F5F5F7", dim: "#C7C7CC" },
        mist: "#A1A1A6",
        amber: { DEFAULT: "#F2A33A", deep: "#C77A1A" },
        cyan: { DEFAULT: "#5CC8E8", deep: "#2C93B3" },
        line: "rgba(245, 245, 247, 0.12)",

        // shadcn tokens, mapped onto the same stage so ui/* inherits it.
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
