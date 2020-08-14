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
  ``;
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    GraphCMS_Product: {
      formattedPrice: {
        type: "String",
        resolve: ({ price }) => {
          return new Intl.NumberFormat("en-US", {
            currency: "USD",
            style: "currency",
          }).format(price / 100);
        },
      },
    },
  };

  createResolvers(resolvers);
};
