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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
