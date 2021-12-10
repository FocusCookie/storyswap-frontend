const {
  accent,
  dark,
  medium,
  neutral,
  primary,
} = require("./src/utils/colors.tailwind");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        accent,
        dark,
        medium,
        neutral,
        primary,
      },
      fontFamily: {
        base: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        highlight: [
          "'Libre Caslon Text'",
          "ui-serif",
          "Georgia",
          "Cambria",
          "'Times New Roman'",
          "Times",
          "serif",
        ],
      },
      opacity: ["disabled"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
