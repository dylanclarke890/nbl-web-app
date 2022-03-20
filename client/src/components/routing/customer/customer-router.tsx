import React from 'react';
import { Route } from 'react-router-dom';
import Booking from "../../booking/booking";
import BookingOptions from '../../booking/booking-options/booking-options';
import CancelBooking from '../../booking/cancel-appointment/cancel-booking';
import Contact from "../../contact/contact";
import Gallery from "../../gallery/gallery";
import Home from "../../home/home";
import Treatments from "../../treatments/treatments";

const customerRouter = [
  <Route key={0} path="/" element={<Home />} />,
  <Route key={1} path="/booking-options" element={<BookingOptions />} />,
  <Route key={2} path="/booking-options/make-a-booking/:treatmentId" element={<Booking />} />,
  <Route key={3} path="/cancel-booking" element={<CancelBooking />} />,
  <Route key={4} path="/treatments" element={<Treatments />} />,
  <Route key={5} path="/gallery" element={<Gallery />} />,
  <Route key={6} path="/contact" element={<Contact />} />,
];

export default customerRouter;