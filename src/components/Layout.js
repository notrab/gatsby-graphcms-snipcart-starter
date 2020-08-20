import React from "react";
import { Link } from "gatsby";

import {
  useCurrencyState,
  useCurrencyDispatch,
} from "../context/CurrencyContext";

export default function Layout({ children }) {
  const { currency } = useCurrencyState();
  const { setCurrency } = useCurrencyDispatch();

  return (
    <React.Fragment>
      <header>
        <Link to="/">Home</Link>
        <select
          defaultValue={currency}
          onBlur={({ target: { value } }) => setCurrency(value)}
          onChange={({ target: { value } }) => setCurrency(value)}
        >
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <button className="snipcart-checkout">
          <span className="snipcart-items-count"></span> Cart
        </button>
      </header>

      {children}
    </React.Fragment>
  );
}
