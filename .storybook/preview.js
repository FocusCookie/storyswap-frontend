import "../src/styles/index.css";

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
};
