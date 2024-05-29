import React from "react";
import { useParams } from "react-router-dom";

// components
import ProductDisplay from "../components/ProductDisplay";

const Product = () => {
  const { id } = useParams();
  return (
    <div
      style={{
        padding: "3rem",
      }}
    >
      <ProductDisplay id={id} />
    </div>
  );
};

export default Product;
