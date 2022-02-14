import React from "react";
import "./home.css";

export default function Home() {
  return (
    <div className="page-wrapper">
      <div className="welcome-shell">
        <p className="text-center home-title">Welcome to NBL!</p>
        <hr />
        <div className="home-action-btn">
          <button className="btn" onClick={() => window.location.href="/book-appointment"}>Book Now!</button>
        </div>
      </div>
    </div>
  );
}
