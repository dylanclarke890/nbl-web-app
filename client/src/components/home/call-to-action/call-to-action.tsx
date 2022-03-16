import React from "react";
import { Link } from "react-router-dom";

import "./call-to-action.css";

export default function CallToAction() {
  return (
    <div>
      <div className="hero-bg">
        <div className="hero-img hero-work-one">
        </div>
        <div className="hero-img hero-work-two">
        </div>
        <div className="hero-img hero-work-three">
        </div>
      </div>
      <div className="hero-box">
        <div className="left-side">
          <p className="title hero-title text-white">NBL by Tanya</p>
          <p className="text-white">
            High quality treatments available at low prices.
          </p>
          <Link className="btn" to={"/booking-options"}>Book Now!</Link>
        </div>
        <div className="right-side">
          <div className="image-box">
            <div className="hero-image"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
