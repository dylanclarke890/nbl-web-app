import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/shared/navbar/navbar";
import MainContent from "./components/routing/main-content";
import Footer from "./components/shared/footer/footer";

import "./styles/App.css";
import "./styles/reset.css";
import "./styles/animations.css";
import "./styles/custom-styles.css";
import "./styles/utilities.css";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <main>
            <div>
              <Navbar />
              <div className="main-content">
                <MainContent />
              </div>
              <Footer />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}
