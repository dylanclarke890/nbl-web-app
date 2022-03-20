import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/shared/navbar/navbar";
import Footer from "./components/shared/footer/footer";
import customerRouter from "./components/routing/customer/customer-router";
import adminRouter from "./components/routing/admin/admin-router";
import NotFound from "./components/shared/error/not-found";

import "./styles/reset.css";
import "./styles/animations.css";
import "./styles/custom-styles.css";
import "./styles/utilities.css";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <main>
            <div>
              <Navbar />
              <div className="main-content">
                <Routes>
                  {customerRouter}
                  {adminRouter}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}
