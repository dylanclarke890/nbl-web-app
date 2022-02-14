import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./home";
import Booking from "./booking/booking";
import Contact from "./contact/contact";
import Treatments from "./treatments";
import Gallery from "./gallery/gallery";

export default function MainContent() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/book-appointment" element={<Booking />}></Route>
      <Route exact path="/treatments" element={<Treatments />}></Route>
      <Route exact path="/gallery" element={<Gallery />}></Route>
      <Route exact path="/contact" element={<Contact />}></Route>
    </Routes>
  );
}
