import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "./components/routing/app-router";

import "./styles/reset.css";
import "./styles/animations.css";
import "./styles/custom-styles.css";
import "./styles/utilities.css";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
          <AppRouter />
      </BrowserRouter>
    );
  }
}
