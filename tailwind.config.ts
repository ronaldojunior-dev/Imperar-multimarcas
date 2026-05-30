import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./admin/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        imperar: {
          black: "#020202",
          red: "#ed1117",
          gold: "#d79b00"
        }
      }
    }
  },
  plugins: []
};

export default config;
