import React from "react";
import { Link, NavLink } from "react-router-dom";

import './admin-navbar.css';

export default function AdminNavbar() {
  return (
    <>
      <div className="admin-navbar flex flex-column">
        <NavLink to={"/admin/appointments"}>Appointments</NavLink>
        <NavLink to={"/admin/schedules"}>Schedules</NavLink>
        <NavLink to={"/admin/treatments"}>Treatments</NavLink>
      </div>
    </>
  )
}