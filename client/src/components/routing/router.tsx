import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../shared/error/not-found";

import adminRouter from "./admin/admin-router";
import customerRouter from "./customer/customer-router";

export default function Router(){
  return (
    <Routes>
    {customerRouter}
    {adminRouter}
    <Route path="*" element={<NotFound />} />
  </Routes>
  )
}