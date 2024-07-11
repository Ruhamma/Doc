import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#20CB0C",
        secondary: "#2EC150",
        tertiary: "#C1F1CC",
        dark: "#404040",
      },
    },
  },
  plugins: [],
};
export default config;
