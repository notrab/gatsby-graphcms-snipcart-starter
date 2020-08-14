import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Img from "gatsby-image";

export const pageQuery = graphql`
  query ProductPageQuery($slug: String!) {
    graphCmsProduct(slug: { eq: $slug }) {
      id
      name
      price
      formattedPrice
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
  const {
    id,
    name,
    price,
    formattedPrice,
    description,
    image,
  } = graphCmsProduct;

  return (
    <React.Fragment>
      <h1>{name}</h1>
      <p>{formattedPrice}</p>

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
        data-item-price={price / 100}
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
