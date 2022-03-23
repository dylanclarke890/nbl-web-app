import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "./components/routing/app-router";
import LoadingController from "./components/shared/loading/loading-controller/loading-controller";
import ToastController from "./components/shared/toast/toast-controller";

import "./styles/reset.css";
import "./styles/animations.css";
import "./styles/custom-styles.css";
import "./styles/utilities.css";

export default function App() {
  return (
    <ToastController>
      <LoadingController>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </LoadingController>
    </ToastController>
  );
}
