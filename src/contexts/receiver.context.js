import React from "react";
const ReceiverContext = React.createContext();

function receiverReducer(state, action) {
  switch (action.type) {
    case "setReceiver": {
      return { ...action.payload };
    }
    case "resetReceiver": {
      return {};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ReceiverProvider({ children }) {
  const [receiverState, receiverDispatch] = React.useReducer(
    receiverReducer,
    {}
  );
  const value = { receiverState, receiverDispatch };

  return (
    <ReceiverContext.Provider value={value}>
      {children}
    </ReceiverContext.Provider>
  );
}

function useReceiver() {
  const context = React.useContext(ReceiverContext);

  if (context === undefined) {
    throw new Error("useReceiver must be used within a ReceiverProvider");
  }
  return context;
}

export { ReceiverProvider, useReceiver };
