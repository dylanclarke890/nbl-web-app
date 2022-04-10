import React from "react";
import { NavLink } from "react-router-dom";

export default function NavbarLinks() {
  return (
    <>
      <NavLink
        className="navbar-item"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="navbar-item"
        to="/treatments"
      >
        Treatments
      </NavLink>
      <NavLink
        className="navbar-item"
        to="/booking-options"
      >
        Book Appointment
      </NavLink>
      <NavLink
        className="navbar-item"
        to="/gallery"
      >
        Gallery
      </NavLink>
      <NavLink
        className="navbar-item"
        to="/contact"
      >
        Contact
      </NavLink>
    </>
  )
}