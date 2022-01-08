import React from "react";
import GERMAN_TEXTS from "../translations/german";
import ENGLISH_TEXTS from "../translations/english";

const LanguageContext = React.createContext();

function languageReducer(state, action) {
  switch (action.type) {
    case "setLanguage": {
      const texts = action.payload === "de-DE" ? GERMAN_TEXTS : ENGLISH_TEXTS;
      const language = action.payload === "de-DE" ? "de-DE" : "en-US";
      return { active: language, texts: texts };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function LanguageProvider({ children }) {
  const [languageState, languageDispatch] = React.useReducer(languageReducer, {
    active: "en-US",
    texts: ENGLISH_TEXTS,
  });
  const value = { languageState, languageDispatch };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const context = React.useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export { LanguageProvider, useLanguage };
