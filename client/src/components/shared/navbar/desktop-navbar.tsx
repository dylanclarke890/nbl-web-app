import React from 'react';
import NavbarLinks from './nav-links';

export default function DesktopNavbar() {
  return (
    <>
      <header className="desktop-navbar hide-mobile">
        <NavbarLinks itemClassNames="navbar-item" />
      </header>
    </>
  )
}