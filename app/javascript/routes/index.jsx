import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Hotels from "../components/Hotels";
// import Hotel from "../components/Hotel";

export default (
  <Router>
    <Routes>
      <Route path="/" exact component={Home} />
      <Route path="/hotels" element={<Hotels />} />
    </Routes>
  </Router>
);