import React from "react";
const MetadataContext = React.createContext();

function metadataReducer(state, action) {
  switch (action.type) {
    case "setMetadata": {
      return { ...action.payload };
    }
    case "deleteMetadata": {
      return {};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function MetadataProvider({ children }) {
  const [metadataState, metadataDispatch] = React.useReducer(
    metadataReducer,
    {}
  );
  const value = { metadataState, metadataDispatch };

  return (
    <MetadataContext.Provider value={value}>
      {children}
    </MetadataContext.Provider>
  );
}

function useMetadata() {
  const context = React.useContext(MetadataContext);

  if (context === undefined) {
    throw new Error("useMetadata must be used within a MetadataProvider");
  }
  return context;
}

export { MetadataProvider, useMetadata };
