/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(222, 47%, 11%)",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        gd: "linear-gradient(89deg, #FF5EDF 0%, #04C8CE 100%)",
      },
    },
  },
  corePlugins: {},
  plugins: [],
};
