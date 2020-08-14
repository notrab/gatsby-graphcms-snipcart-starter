import React from "react";
import { MDXProvider } from "@mdx-js/react";

import Layout from "./src/components/Layout";

export const wrapPageElement = ({ element, ...props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <MDXProvider>{element}</MDXProvider>
);

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    React.createElement("link", {
      key: "snipcart-app-preconnect",
      rel: "preconnect",
      href: "https://app.snipcart.com",
    }),
    React.createElement("link", {
      key: "snipcart-cdn-preconnect",
      rel: "preconnect",
      href: "https://cdn.snipcart.com",
    }),
    React.createElement("link", {
      key: "snipcart-css",
      rel: "stylesheet",
      href: "https://cdn.snipcart.com/themes/v3.0.19/default/snipcart.css",
    }),
  ]);

  setPreBodyComponents([
    React.createElement("div", {
      key: "snipcart-div",
      id: "snipcart",
      "data-api-key": process.env.GATSBY_SNIPCART_PUBLIC_API_KEY,
      "data-config-add-product-behavior": "none",
      hidden: true,
    }),
    React.createElement("script", {
      key: "snipcart-js",
      src: "https://cdn.snipcart.com/themes/v3.0.19/default/snipcart.js",
    }),
  ]);
};
