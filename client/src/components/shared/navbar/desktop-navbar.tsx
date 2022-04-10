import React from 'react';
import NavbarLinks from './navbar-links';

export default function DesktopNavbar() {
  return (
    <>
      <div className="desktop-navbar hide-mobile">
        <NavbarLinks />
      </div>
    </>
  )
}