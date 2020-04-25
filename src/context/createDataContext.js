import React, { createContext, useReducer } from "react";

export default (reducer, actions, defaultValue) => {
  const AuthContext = createContext();

  const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {};

    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <AuthContext.Provider value={{ state, ...boundActions }}>
        {children}
      </AuthContext.Provider>
    );
  };

  return { Context: AuthContext, Provider: AuthProvider };
};
