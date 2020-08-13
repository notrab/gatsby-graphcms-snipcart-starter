import React from "react";
import { Link } from "gatsby";

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <header>
        <Link to="/">Home</Link>
        <button class="snipcart-checkout">
          <span class="snipcart-items-count"></span> Cart
        </button>
      </header>

      {children}
    </React.Fragment>
  );
}
