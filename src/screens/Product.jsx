import React from "react";
import { useParams } from "react-router-dom";
import ProductDisplay from "../components/ProductDisplay";

const Product = () => {
  const { id } = useParams();
  return (
    <div>
      <ProductDisplay id={id} />
    </div>
  );
};

export default Product;
