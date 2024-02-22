import starlight from "@astrojs/starlight-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        accent: {
          200: "#f4b8e4",
          600: "#ea76cb"
        },
        gray: {
          50: "#e6e9ef",
          100: "#eff1f5",
          200: "#b5bfe2",
          300: "#a5adce",
          400: "#626880",
          500: "#51576d",
          600: "#414559",
          700: "#303446",
          800: "#292c3c",
          900: "#232634"
        }
      },
      fontFamily: {
        sans: ["Comfortaa"]
      }
    }
  },
  plugins: [starlight()]
};
