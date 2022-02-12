import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './components/home';
import Booking from './components/booking';
import Contact from './components/contact';

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <main>
          <div className="App">
            <nav className="navbar">
              <NavLink
                exact
                activeClassName="navbar-item-active"
                className="navbar-item"
                to="/">
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
            </nav>
           <Routes>
                 <Route exact path='/' element={< Home />}></Route>
                 <Route exact path='/booking' element={< Booking />}></Route>
                 <Route exact path='/contact' element={< Contact />}></Route>
          </Routes>
          </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
