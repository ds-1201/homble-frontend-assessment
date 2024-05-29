import React, { useState, useEffect } from "react";
import { Table, Button, Form, FormControl, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

// helpers
import { DASHBOARD_URL } from "../helpers";
import useFetch from "../hooks/useFetch";

const Dashboard = () => {
  const [products, setProducts] = useState(null);
  const [sortTerm, setSortTerm] = useState("");
  const [input, setInput] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [data, loading] = useFetch(DASHBOARD_URL());

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    if (products != null) {
      setSortedProducts(
        [...(input !== "" ? sortedProducts : products)].sort((a, b) => {
          if (sortTerm === "id") return parseInt(a.id) - parseInt(b.id);
          else if (sortTerm === "price")
            return parseInt(a.selling_price) - parseInt(b.selling_price);
          else if (sortTerm === "name") return a.name > b.name ? 1 : -1;
          else return parseInt(a.id) - parseInt(b.id);
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortTerm, products, input]);

  const handleCheck = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    setSortedProducts(sortedProducts.filter((product) => product.id !== id));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setInput(value);

    // Filter products based on input value
    const filteredProducts = products.filter((product) => {
      const idMatch = new RegExp(value, "i").test(product.id);
      const nameMatch = new RegExp(value, "i").test(product.name);
      return idMatch || nameMatch;
    });

    setSortedProducts(filteredProducts);
  };

  return (
    <div
      style={{
        padding: "3rem",
      }}
    >
      <Form
        inline
        style={{
          display: "flex",
          marginBottom: "1rem",
        }}
      >
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
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={input}
          onChange={handleSearch}
        />
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Button
                variant="outline-primary"
                onClick={() => setSortTerm("id")}
              >
                Product ID
              </Button>
            </th>
            <th>
              <Button
                variant="outline-primary"
                onClick={() => setSortTerm("price")}
              >
                Selling Price
              </Button>
            </th>
            <th>
              <Button
                variant="outline-primary"
                onClick={() => setSortTerm("name")}
              >
                Name
              </Button>
            </th>
            <th>Check</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                <Spinner animation="border" />
              </td>
            </tr>
          ) : (
            sortedProducts?.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.selling_price}</td>
                <td>{product.name}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleCheck(product.id)}
                  >
                    Check
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
