import React from 'react';
import { Route } from 'react-router-dom';
import Booking from "../../booking/booking";
import Contact from "../../contact/contact";
import Gallery from "../../gallery/gallery";
import Home from "../../home/home";
import Treatments from "../../treatments/treatments";

const customerRouter = [
  <Route key={0} path="/" element={<Home />}></Route>,
  <Route key={1} path="/book-appointment" element={<Booking />}></Route>,
  <Route key={2} path="/treatments" element={<Treatments />}></Route>,
  <Route key={3} path="/gallery" element={<Gallery />}></Route>,
  <Route key={4} path="/contact" element={<Contact />}></Route>,
];

export default customerRouter;