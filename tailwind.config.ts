import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        editor: {
          bg: "#f8f9fa",
          border: "#e9ecef",
          text: "#212529",
        },
        preview: {
          bg: "#ffffff",
          border: "#e9ecef",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;