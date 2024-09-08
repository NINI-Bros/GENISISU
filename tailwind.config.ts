import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "next-btn": "url(/images/btn_next.png)"
      },
      backgroundColor: {
        "item-background": "#191919"
      },
      fontFamily: {
        "Hyundai-sans": "Hyundai Sans Head Office"
      },
    },
  },
  plugins: [],
};
export default config;
