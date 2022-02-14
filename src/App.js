import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import MainContent from "./components/routing/main-content";
import Footer from "./components/footer/footer";

import "./styles/App.css";

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
