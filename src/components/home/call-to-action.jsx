import React from "react";

import "./call-to-action.css";

export default function CallToAction() {
  return (
    <div className="hero-wrapper">
      <div className="hero-image img-responsive">
        <div className="hero-text">
          <h1>NBL</h1>
          <p>By Tanya</p>
          <button
            className="btn"
            onClick={() => (window.location.href = "/book-appointment")}
          >
            Book Now!
          </button>
        </div>
      </div>
    </div>
  );
}
