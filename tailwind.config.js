import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        authLoginBg: "url('/src/assets/auth/authLoginBg.jpg')",
        bannerBg: "url('/public/homepagebanner.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
