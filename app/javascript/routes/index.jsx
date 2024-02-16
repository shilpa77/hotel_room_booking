import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Hotels from "../components/Hotels";
import Hotel from "../components/Hotel";
import RoomBookings from "../components/RoomBookings";

export default (
  <Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotel/:id" element={<Hotel />} />
        <Route path="/room_bookings" element={<RoomBookings />} />
    </Routes>
  </Router>
);