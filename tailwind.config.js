/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "PingFang SC",
          "Helvetica Neue",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
      colors: {
        glass: {
          light: "rgba(255, 255, 255, 0.6)",
          medium: "rgba(255, 255, 255, 0.4)",
          heavy: "rgba(255, 255, 255, 0.75)",
          dark: "rgba(28, 28, 30, 0.6)",
          "dark-medium": "rgba(28, 28, 30, 0.45)",
          "dark-heavy": "rgba(28, 28, 30, 0.8)",
        },
        macos: {
          blue: "#0A84FF",
          purple: "#BF5AF2",
          pink: "#FF375F",
          red: "#FF453A",
          orange: "#FF9F0A",
          yellow: "#FFD60A",
          green: "#30D158",
          teal: "#64D2FF",
          indigo: "#5E5CE6",
        },
      },
      backdropBlur: {
        xs: "2px",
        "3xl": "64px",
        "4xl": "72px",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glass:
          "0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.4)",
        "glass-lg":
          "0 16px 48px 0 rgba(31, 38, 135, 0.18), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)",
        "glass-dark":
          "0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
        "glass-dark-lg":
          "0 16px 48px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        soft: "0 4px 24px rgba(0, 0, 0, 0.06)",
        glow: "0 0 24px rgba(10, 132, 255, 0.35)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-light":
          "radial-gradient(at 0% 0%, rgba(10,132,255,0.18) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(191,90,242,0.18) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(48,209,88,0.15) 0px, transparent 50%)",
        "mesh-dark":
          "radial-gradient(at 0% 0%, rgba(10,132,255,0.25) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(191,90,242,0.2) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(94,92,230,0.2) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};
