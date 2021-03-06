import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

export default function Product({ id, slug, name, image }, index) {
  return (
    <Link key={index} to={`/${slug}`}>
      {image && (
        <Img
          style={{ width: 250 }}
          fluid={image.localFile.childImageSharp.fluid}
          alt={name}
          title={name}
        />
      )}
      <h4>{name}</h4>
    </Link>
  );
}
