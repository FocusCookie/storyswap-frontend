import "../src/styles/index.css";
import { medium } from "../src/utils/colors.tailwind";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  a11y: {
    // the target DOM element in index.js
    element: "#root",
    // sets the execution mode for the addon
    manual: false,
  },
  backgrounds: {
    default: "storyswap",
    values: [
      {
        name: "storyswap",
        value: medium[500],
      },
    ],
  },
};
