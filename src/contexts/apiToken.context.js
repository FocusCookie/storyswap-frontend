import React from "react";
const ApiTokenContext = React.createContext();

function apiTokenContext(state, action) {
  switch (action.type) {
    case "setApiToken": {
      return { value: action.payload };
    }
    case "deleteApiToken": {
      return { value: undefined };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ApiTokenProvider({ children }) {
  const [apiTokenState, apiTokenDispatch] = React.useReducer(
    apiTokenContext,
    null
  );
  const value = { apiTokenState, apiTokenDispatch };

  return (
    <ApiTokenContext.Provider value={value}>
      {children}
    </ApiTokenContext.Provider>
  );
}

function useApiToken() {
  const context = React.useContext(ApiTokenContext);

  if (context === undefined) {
    throw new Error("useApiToken must be used within a ApiTokenProvider");
  }
  return context;
}

export { ApiTokenProvider, useApiToken };
