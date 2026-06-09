import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./CheckIn/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050608",
        carbon: "#0b0d10",
        graphite: "#171a1f",
        steel: "#8e959f",
        champagne: "#d2b894",
        ember: "#f4d8aa",
      },
      boxShadow: {
        aura: "0 24px 60px rgba(0, 0, 0, 0.35)",
        line: "inset 0 0 0 1px rgba(255, 255, 255, 0.06)",
      },
      backgroundImage: {
        "radial-premium":
          "radial-gradient(circle at top, rgba(210, 184, 148, 0.18), transparent 30%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1), transparent 22%)",
      },
    },
  },
  plugins: [],
};

export default config;
