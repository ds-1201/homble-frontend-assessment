import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Product from "./screens/Product";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product/:id" element={<Product />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
