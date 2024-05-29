import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ProductModal = ({ show, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productAllergenInfo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              value={formData.productName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Product Description"
              value={formData.productDescription}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productAllergenInfo">
            <Form.Label>Product Allergen Info</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Allergen Info"
              value={formData.productAllergenInfo}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
