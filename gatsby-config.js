require("dotenv").config();

module.exports = {
  siteMetadata: {
    siteUrl: "http://localhost:8000",
  },
  plugins: [
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-graphcms",
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        downloadLocalImages: true,
        buildMarkdownNodes: true,
      },
    },
    {
      resolve: "gatsby-plugin-json-pages",
      options: {
        pages: [
          {
            fileName: "products",
            query: `
              query {
                allGraphCmsProduct {
                  nodes {
                    id
                    name
                    slug
                    prices {
                      amount
                      currency
                    }
                  }
                }
              }
            `,
            transformer: ({
              data: {
                allGraphCmsProduct: { nodes },
              },
            }) =>
              nodes.map(({ prices, ...product }) => ({
                url: `/${slug}`,
                ...product,
                price: prices.reduce(
                  (current, state) => ({
                    [state.currency.toString().toLowerCase()]: state.amount,
                    ...current,
                  }),
                  {}
                ),
              })),
          },
        ],
      },
    },
  ],
};
