import React from "react";
import { Routes } from "react-router-dom";

import adminRouter from "./admin/admin-router";
import customerRouter from "./customer/customer-router";

export default function Router(){
  return (
    <Routes>
    {customerRouter}
    {adminRouter}
  </Routes>
  )
}