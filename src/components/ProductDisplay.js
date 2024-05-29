import React, { useEffect, useState } from "react";
import { getRequest } from "../axios";
import { Container, Spinner, Accordion, Image } from "react-bootstrap";

const ProductDisplay = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await getRequest(`/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Container
      style={{
        padding: "3rem",
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transform: "translateY(-5rem)",
            }}
          >
            <Spinner animation="border" role="status"></Spinner>
            <p>Loading...</p>
          </div>
        </div>
      ) : !product ? (
        <div>Product not found</div>
      ) : (
        <>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <h1>{product.name}</h1>
              <p>Price: {product.selling_price}</p>
            </div>
            <div>
              <Image
                className="mt-1 mb-3"
                src={product.productImage}
                width={"200"}
                height={"auto"}
              />
            </div>
          </div>

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Description</Accordion.Header>
              <Accordion.Body>{product.description}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Allergen Information</Accordion.Header>
              <Accordion.Body>{product.allergen_info}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Usage Instructions</Accordion.Header>
              <Accordion.Body>{product.cooking_instruction}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
      )}
    </Container>
  );
};

export default ProductDisplay;
