import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/footer.css";
import Facebook from "./social-icons/facebook";
import Instagram from "./social-icons/instagram";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="social-icons">
        <Facebook />
        <Instagram />
      </div>
      <nav className="footer-nav">
        <div className="footer-items-wrapper">
          <NavLink className="footer-item" to="/">
            Home
          </NavLink>
          <NavLink className="footer-item" to="/book-appointment">
            Book Appointment
          </NavLink>
          <NavLink className="footer-item" to="/contact">
            Contact
          </NavLink>
        </div>
      </nav>
      <div>
        <p className="text-center no-pad-margin">© CK Web Designs - {currentYear}</p>
      </div>
    </div>
  );
}
