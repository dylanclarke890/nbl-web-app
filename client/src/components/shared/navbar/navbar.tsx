import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
const imageSrc = require("../../../images/nbl-logo-brand.jpeg")

export default function Navbar() {
  return <nav className="navbar">
    <NavLink className="navbar-brand" to="/">
      <img src={imageSrc} className="navbar-img" alt='brand'/>
    </NavLink>
    <div className="navbar-items-wrapper">
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
        to="/book-appointment"
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
    </div>
  </nav>;
}