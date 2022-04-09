import React from "react";
import TitleAndDesc from "../shared/title-and-desc/title-and-desc";
import AdminDashboard from "./admin-dashboard/admin-dashboard";

export default function Admin() {
  return (
    <>
      <TitleAndDesc title="Admin Dashboard" />
      <AdminDashboard />
    </>
  )
}