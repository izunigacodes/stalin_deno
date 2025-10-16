import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme:{
    extend:{},
  },
  darkMode: "class",
} satisfies Config;
