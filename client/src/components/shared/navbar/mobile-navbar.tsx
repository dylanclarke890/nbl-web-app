import React, { useState } from "react";
import NavbarLinks from "./nav-links";

export default function MobileNavbar() {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => { setVisible(!visible) };
  return (
    <>
      <div className="mobile-navbar mobile-only">
        <div className={`navbar-hamburger ${visible ? "active" : ""}`} onClick={toggleVisible}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {visible ? (
          <>
            <div className="navbar-dropdown">
              <NavbarLinks itemClassNames="navbar-item" />
            </div>
          </>) : null}
      </div>
    </>
  )
}