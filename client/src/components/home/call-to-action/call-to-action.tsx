import React from "react";
import { Link } from "react-router-dom";

import nblLogo from '../../../images/nbl-logo.jpg';

import "./call-to-action.css";

export default function CallToAction() {
  return (
    <>
      <div className="cta">
        <div className="hero-bg">
          <div className="hero-img hero-work-one">
          </div>
          <div className="hero-img hero-work-two">
          </div>
          <div className="hero-img hero-work-three">
          </div>
        </div>
        <div className="hero-box">
          <div className="left-side fade-in">
            <h1 className="title hero-title text-white">NBL by Tanya</h1>
            <p className="text-white">
              High quality treatments available at low prices.
            </p>
            <Link className="btn" to={"/booking-options"}>Book Now!</Link>
          </div>
          <div className="right-side fade-in">
            <div className="image-box">
              <div className="hero-image"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-cta">
        <h1 className="title text-center mt-3">NBL by Tanya</h1>
        <p className="text-center">High quality treatments available at low prices.</p>
        <div className="flex justify-center">
          <img className="mobile-cta-image" src={nblLogo} alt="brand" />
        </div>
        <div className="flex justify-center mt-2">
          <Link className="btn btn-sm" to={"/booking-options"}>Book Now!</Link>
        </div>
      </div>
    </>
  );
}
