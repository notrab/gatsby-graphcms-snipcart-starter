const currencyFormatter = require("currency-formatter");
const path = require("path");

const PRODUCTS_QUERY = `
  query {
    allGraphCmsProduct {
      nodes {
        slug
      }
    }
  }
`;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const {
    data: {
      allGraphCmsProduct: { nodes: products },
    },
  } = await graphql(PRODUCTS_QUERY);

  products.forEach(({ slug }) =>
    createPage({
      component: path.resolve("./src/templates/ProductPage.js"),
      context: { slug },
      path: `/${slug}`,
    })
  );
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    GraphCMS_Price: {
      formatted: {
        type: "String",
        resolve: ({ amount, currency: code }) => {
          return currencyFormatter.format(amount / 100, { code });
        },
      },
    },
  };

  createResolvers(resolvers);
};
