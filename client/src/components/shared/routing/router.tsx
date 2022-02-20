import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../home/home";
import Booking from "../../booking/booking";
import Contact from "../../contact/contact";
import Treatments from "../../treatments/treatments";
import Gallery from "../../gallery/gallery";

export default function Router(){
  return (
    <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/book-appointment" element={<Booking />}></Route>
    <Route path="/treatments" element={<Treatments />}></Route>
    <Route path="/gallery" element={<Gallery />}></Route>
    <Route path="/contact" element={<Contact />}></Route>
  </Routes>
  )
}