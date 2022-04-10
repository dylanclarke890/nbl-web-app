import React from 'react';
import { NavLink } from 'react-router-dom';

import './navbar.css';
import imageSrc from "../../../images/nbl-logo-brand.jpg";
import DesktopNavbar from './desktop-navbar';
import MobileNavbar from './mobile-navbar';


export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <NavLink className="navbar-brand" to="/">
          <img src={imageSrc} className="navbar-img" alt='brand' />
        </NavLink>
        <DesktopNavbar />
        <MobileNavbar />
      </nav>
    </>
  );
}