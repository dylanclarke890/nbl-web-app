import React from "react";
import TitleAndDesc from "../shared/title-and-desc/title-and-desc";

import CallToAction from "./call-to-action/call-to-action";

import "./home.css";

export default function Home() {
  return (
    <>
      <TitleAndDesc title="Nails, Brows and Lashes by Tanya" desc="High quality treatments available at low prices. Book now!" />
      <div className="page-wrapper">
        <CallToAction />
      </div>
    </>
  );
}
