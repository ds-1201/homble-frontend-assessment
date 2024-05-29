import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Container, Row, Col, Button } from "react-bootstrap";
// helpers
import { getRequest, postRequest } from "../axios";

// components
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await getRequest("/products");
      const list = response.data;
      sortBySellingPrice(list);
      setProducts(list);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const sortBySellingPrice = (list) => {
    list.sort((a, b) => a.selling_price - b.selling_price);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    try {
      const response = await postRequest("/products", formData);
      window.alert(response?.data);
      fetchProducts();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ProductModal
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />

      {loading ? (
        <Row>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <Col key={i} md={6} lg={4} sm={12} xs={12}>
              <Skeleton height={"30vh"} />
            </Col>
          ))}
        </Row>
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <h1>Products</h1>
            <div>
              <Link to="/dashboard">
                <Button
                  style={{
                    marginRight: "1rem",
                  }}
                  variant="primary"
                >
                  Dashboard
                </Button>
              </Link>
              <Button variant="primary" onClick={handleShow}>
                Add Product
              </Button>
            </div>
          </div>
          <Row className=" g-4">
            {products.map((product) => (
              <Col key={product.id} md={6} lg={4} sm={12} xs={12}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductsList;
