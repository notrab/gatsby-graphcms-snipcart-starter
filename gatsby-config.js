require("dotenv").config();

module.exports = {
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
  ],
};
