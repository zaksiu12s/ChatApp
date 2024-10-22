/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        "slide-in-right":
          "slide-in-right .5s cubic-bezier(0, 0, 0.2, 1) forwards",
        "slide-out-right":
          "slide-out-right 1s cubic-bezier(0, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [],
};
