import React from "react";

import SocialIcon from "./social-icon/social-icon";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import "./footer.css";
import NavbarLinks from "../navbar/nav-links";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const facebookLink = "https://www.facebook.com/NBLbyTanya/";
  const instaLink = "https://www.instagram.com/nbl_bytanya/";

  return (
    <div className="footer">
      <div className="social-icons">
        <SocialIcon link={facebookLink}><FaFacebook /></SocialIcon>
        <SocialIcon link={instaLink}><FaInstagram /></SocialIcon>
      </div>
      <nav className="footer-nav">
        <div className="footer-items-wrapper">
          <NavbarLinks itemClassNames="footer-item" />
        </div>
      </nav>
      <div>
        <p className="text-center no-pad-margin">© CK Web Designs - {currentYear}</p>
      </div>
    </div>
  );
}
