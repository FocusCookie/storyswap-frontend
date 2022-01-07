import React from "react";
const LanguageContext = React.createContext();

function languageReducer(state, action) {
  switch (action.type) {
    case "setLanguage": {
      return action.payload;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function LanguageProvider({ children }) {
  const [languageState, languageDispatch] = React.useReducer(
    languageReducer,
    {}
  );
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
