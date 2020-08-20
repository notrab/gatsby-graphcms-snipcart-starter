import React, { createContext, useContext, useReducer } from "react";

const CurrencyStateContext = createContext();
const CurrencyDispatchContext = createContext();

const SET_CURRENCY = "SET_CURRENCY";

const initialState = {
  currency: "EUR",
};

const reducer = (state, { type, currency }) => {
  switch (type) {
    case SET_CURRENCY:
      return { ...state, currency };
    default:
      throw new Error(`Invalid action: ${type}`);
  }
};

const CurrencyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCurrency = (currency) => dispatch({ type: SET_CURRENCY, currency });

  return (
    <CurrencyStateContext.Provider value={state}>
      <CurrencyDispatchContext.Provider value={{ setCurrency }}>
        {children}
      </CurrencyDispatchContext.Provider>
    </CurrencyStateContext.Provider>
  );
};

const useCurrencyState = () => {
  const context = useContext(CurrencyStateContext);

  if (!context)
    throw new Error("useCurrencyState must be used within a CurrencyProvider");

  return context;
};

const useCurrencyDispatch = () => {
  const context = useContext(CurrencyDispatchContext);

  if (!context)
    throw new Error(
      "useCurrencyDispatch must be used within a CurrencyProvider"
    );

  return context;
};

export { CurrencyProvider, useCurrencyState, useCurrencyDispatch };
