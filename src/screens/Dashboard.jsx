import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Form,
  FormControl,
  Spinner,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSortDown, FaSortUp } from "react-icons/fa";

// helpers
import { DASHBOARD_URL } from "../helpers";

// hooks
import useFetch from "../hooks/useFetch";
import DashboardTableRow from "../components/DashboardTableRow";

const Dashboard = () => {
  const [products, setProducts] = useState(null);
  const [sortTerm, setSortTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("");
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
          const direction = sortDirection === "asc" ? 1 : -1;
          if (sortTerm === "id")
            return (parseInt(a.id) - parseInt(b.id)) * direction;
          else if (sortTerm === "price")
            return (
              (parseInt(a.selling_price) - parseInt(b.selling_price)) *
              direction
            );
          else if (sortTerm === "name") {
            return a.name.localeCompare(b.name) * direction;
          } else return parseInt(a.id) - parseInt(b.id);
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortTerm, products, input, sortDirection]);

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

  const handleSort = (term) => {
    if (sortTerm === term) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortTerm(term);
      setSortDirection("asc");
    }
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
              Product ID{" "}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Sort by ID</Tooltip>}
              >
                <Button
                  variant="outline-primary"
                  onClick={() => handleSort("id")}
                  className="float-end"
                >
                  {sortTerm === "id" &&
                    (sortDirection === "asc" ? (
                      <FaSortUp className="text-success" />
                    ) : (
                      <FaSortDown className="text-danger" />
                    ))}
                </Button>
              </OverlayTrigger>
            </th>
            <th>
              Selling Price{" "}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Sort by Price</Tooltip>}
              >
                <Button
                  variant="outline-primary"
                  onClick={() => handleSort("price")}
                  className="float-end"
                >
                  {sortTerm === "price" &&
                    (sortDirection === "asc" ? (
                      <FaSortUp className="text-success" />
                    ) : (
                      <FaSortDown className="text-danger" />
                    ))}
                </Button>
              </OverlayTrigger>
            </th>
            <th>
              Name{" "}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Sort by Name</Tooltip>}
              >
                <Button
                  variant="outline-primary"
                  onClick={() => handleSort("name")}
                  className="float-end"
                >
                  {sortTerm === "name" &&
                    (sortDirection === "asc" ? (
                      <FaSortUp className="text-success" />
                    ) : (
                      <FaSortDown className="text-danger" />
                    ))}
                </Button>
              </OverlayTrigger>
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
              <DashboardTableRow
                product={product}
                key={product.id}
                handleCheck={handleCheck}
              />
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
