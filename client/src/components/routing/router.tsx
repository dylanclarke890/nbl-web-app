import React from "react";
import { Route, Routes } from "react-router-dom";

import adminRouter from "./admin/admin-router";
import customerRouter from "./customer/customer-router";
import NotFound from "../shared/error/not-found";

export default function Router() {
  return (
    <Routes>
      {customerRouter}
      {adminRouter}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}