import React from "react";
import { NavLink } from "react-router-dom";

export default function NavbarLinks({ itemClassNames }: { itemClassNames: string }) {
  return (
    <>
      <NavLink
        className={itemClassNames}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={itemClassNames}
        to="/treatments"
      >
        Treatments
      </NavLink>
      <NavLink
        className={itemClassNames}
        to="/booking-options"
      >
        Bookings
      </NavLink>
      <NavLink
        className={itemClassNames}
        to="/gallery"
      >
        Gallery
      </NavLink>
      <NavLink
        className={itemClassNames}
        to="/contact"
      >
        Contact
      </NavLink>
    </>
  )
}