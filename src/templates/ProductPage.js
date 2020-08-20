import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Img from "gatsby-image";

export const pageQuery = graphql`
  query ProductPageQuery($slug: String!) {
    graphCmsProduct(slug: { eq: $slug }) {
      id
      name
      prices {
        amount
        currency
        formatted
      }
      description {
        markdownNode {
          childMdx {
            body
          }
        }
      }
      image {
        url
        localFile {
          childImageSharp {
            fluid(maxWidth: 1120) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default function ProductPage({ data: { graphCmsProduct }, location }) {
  const { href } = location;
  const { id, name, prices, description, image } = graphCmsProduct;
  const [price] = prices;
  const currenciesAndPrices = JSON.stringify(
    prices.reduce(
      (current, state) => ({
        [state.currency.toString().toLowerCase()]: state.amount,
        ...current,
      }),
      {}
    )
  ).replace(/"/g, "&quot;");

  return (
    <React.Fragment>
      <h1>{name}</h1>
      <p>{price.formatted}</p>

      {image && (
        <Img
          fluid={image.localFile.childImageSharp.fluid}
          fadeIn={false}
          alt={name}
          title={name}
          style={{ width: 250 }}
        />
      )}

      <button
        className="snipcart-add-item"
        data-item-id={id}
        data-item-price={currenciesAndPrices}
        data-item-url={href}
        data-item-image={image.url}
        data-item-name={name}
      >
        Add to cart
      </button>

      <MDXRenderer>{description.markdownNode.childMdx.body}</MDXRenderer>
    </React.Fragment>
  );
}
