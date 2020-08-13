import React from "react";
import { graphql } from "gatsby";

import Img from "gatsby-image";

export const pageQuery = graphql`
  query ProductPageQuery($slug: String!) {
    graphCmsProduct(slug: { eq: $slug }) {
      id
      name
      price
      content {
        markdown
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
  const { id, name, price, content, image } = graphCmsProduct;

  return (
    <React.Fragment>
      <h1>{name}</h1>

      {image && (
        <Img
          style={{ width: 250 }}
          fluid={image.localFile.childImageSharp.fluid}
          alt={name}
          title={name}
        />
      )}

      <button
        className="snipcart-add-item"
        data-item-id={id}
        data-item-price={price}
        data-item-url={href}
        data-item-image={image.url}
        data-item-name={name}
      >
        Add to cart
      </button>
    </React.Fragment>
  );
}
