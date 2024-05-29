import React from "react";
import ProductsList from "../components/ProductsList";

const Home = () => {
  return (
    <div style={{ padding: 20 }}>
      {/* <h3> Welcome to Homble Frontend Assessment</h3>
      <p>Pages overview:</p>
      <ul>
        <li>Page 1 - Product list page and create button</li>
        <li>Page 2 - Product detail page</li>
        <li>Page 3 - Product dashboard</li>
      </ul> */}

      <ProductsList />
    </div>
  );
};

export default Home;
