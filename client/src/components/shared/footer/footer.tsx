import React from "react";
import { NavLink } from "react-router-dom";

import "./footer.css";
import SocialIcon from "./social-icon";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const facebookLink = "https://www.facebook.com/NBLbyTanya/";
  const instaLink = "https://www.instagram.com/nbl_bytanya/";

  return (
    <div className="footer">
      <div className="social-icons">
        <SocialIcon link={facebookLink}><FaFacebook/></SocialIcon>
        <SocialIcon link={instaLink}><FaInstagram/></SocialIcon>
      </div>
      <nav className="footer-nav">
        <div className="footer-items-wrapper">
          <NavLink className="footer-item" to="/">
            Home
          </NavLink>
          <NavLink className="footer-item" to="/treatments">
            Treatments
          </NavLink>
          <NavLink className="footer-item" to="/book-appointment">
            Book Appointment
          </NavLink>
          <NavLink className="footer-item" to="/gallery">
            Gallery
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
