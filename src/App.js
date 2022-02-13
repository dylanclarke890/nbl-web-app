import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Home from "./components/home";
import Booking from "./components/booking";
import Contact from "./components/contact";
import navbarLogo from "./images/nbl-logo-brand.jpeg";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <main>
            <div>
              <nav className="navbar">
                <NavLink className="navbar-brand" exact to="/">
                  <img src={navbarLogo} className="navbar-img" />
                </NavLink>
                <div className="navbar-items-wrapper">
                  <NavLink
                    exact
                    activeClassName="navbar-item-active"
                    className="navbar-item"
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    activeClassName="navbar-item-active"
                    className="navbar-item"
                    to="/booking"
                  >
                    Make A Booking
                  </NavLink>
                  <NavLink
                    activeClassName="navbar-item-active"
                    className="navbar-item"
                    to="/contact"
                  >
                    Contact
                  </NavLink>
                </div>
              </nav>
              <div className='main-content'>
                <Routes>
                  <Route exact path="/" element={<Home />}></Route>
                  <Route exact path="/booking" element={<Booking />}></Route>
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

export default App;
