import React from "react";
import { graphql } from "gatsby";

import ProductGrid from "../components/ProductGrid";

export const pageQuery = graphql`
  {
    allGraphCmsProduct {
      nodes {
        name
        slug
        image {
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
  }
`;

export default function IndexPage({
  data: {
    allGraphCmsProduct: { nodes: products },
  },
}) {
  return <ProductGrid products={products} />;
}
