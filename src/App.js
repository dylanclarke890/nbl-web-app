import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/home";
import Booking from "./components/booking";
import Contact from "./components/contact";
import Navbar from "./components/navbar";

import "./styles/App.css";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <main>
            <div>
              {<Navbar />}
              <div className='main-content'>
                <Routes>
                  <Route exact path="/" element={<Home />}></Route>
                  <Route exact path="/book-appointment" element={<Booking />}></Route>
                  <Route exact path="/contact" element={<Contact />}></Route>
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}