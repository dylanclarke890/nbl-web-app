import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./home";
import Booking from "./booking";
import Contact from "./contact";

export default function MainContent() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route
        exact
        path="/book-appointment"
        element={<Booking />}
      ></Route>
      <Route exact path="/contact" element={<Contact />}></Route>
  </Routes>
  )
}