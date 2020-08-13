import React from "react";

import Product from "./Product";

export default function ProductGrid({ products }) {
  if (!products) return <p>There are no products to show</p>;

  return products.map(Product);
}
