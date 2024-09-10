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
        background: "var(--background)",
        foreground: "var(--foreground)",
        verde: {
          claro: "#E6F2E6",
          normal: "#028003",
          normalHover: "#027303",
          normalActive: "#026602",
          escuro: "#026002"
        }
      },
    },
  },
  plugins: [],
};
export default config;
