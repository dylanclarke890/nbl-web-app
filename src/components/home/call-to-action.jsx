import React from "react";

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
    <div class="hero-box">
      <div class="left-side">
        <p className="title hero-title text-white">NBL by Tanya</p>
        <p className="text-white">
          High quality treatments available at low prices.
        </p>
        <button
          className="btn"
          onClick={() => (window.location.href = "/book-appointment")}
        >
          Book Now!
        </button>
      </div>
      <div class="right-side">
        <div class="image-box">
          <div class="hero-image"></div>
        </div>
      </div>
    </div>
    </div>
  );
}
