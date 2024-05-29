import React, { useEffect, useState } from "react";
import { Container, Spinner, Accordion, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// helpers
import { getRequest } from "../axios";
import { PRODUCT_ID_URL } from "../helpers";

const ProductDisplay = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await getRequest(PRODUCT_ID_URL(id));
      setProduct(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
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
          <div className="d-flex justify-content-between">
            <Link to="/">
              <Button
                style={{
                  marginRight: "1rem",
                }}
                variant="danger"
              >
                Back
              </Button>
            </Link>
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-md-between justify-content-center align-items-center align-items-md-start">
            <div className="mb-3">
              <h1 className="mb-3">{product.name}</h1>
              <p>Price: {product.selling_price}</p>
            </div>
            <div className="mb-3">
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
