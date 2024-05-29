import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

// helpers
import { postRequest } from "../axios";
import { PRODUCTS_URL, sortBySellingPrice } from "../helpers";

// components
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

// hooks
import useFetch from "../hooks/useFetch";

const ProductsList = () => {
  const [products, setProducts] = useState(null);
  const [show, setShow] = useState(false);
  const [data, loading, fetchData] = useFetch(PRODUCTS_URL());
  const displayProducts = sortBySellingPrice(products);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    try {
      const response = await postRequest(PRODUCTS_URL(), formData);
      toast.success(response?.data);
      fetchData();
      handleClose();
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!!");
    }
  };

  useEffect(() => {
    setProducts(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Container fluid className="p-0">
      <ProductModal
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />

      {loading ? (
        <Row className="d-flex justify-content-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <Col key={i} md={6} lg={4} sm={12} xs={12}>
              <Skeleton height={"30vh"} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row className="d-flex justify-content-center">
          <Col md={10}>
            <div className="d-flex justify-content-between">
              <h1>Products</h1>
              <div>
                <Link className="d-inline-block" to="/dashboard">
                  <Button
                    style={{
                      marginRight: "1rem",
                    }}
                    variant="primary"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  className="d-inline-block"
                  variant="primary"
                  onClick={handleShow}
                >
                  Add Product
                </Button>
              </div>
            </div>

            <Row className="g-4">
              {displayProducts?.map((product) => (
                <Col key={product.id} md={6} lg={4} sm={12} xs={12}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductsList;
