import React from "react";
import FailureSvg from "../../shared/svgs/failure-svg";

import './times-unavailable.css';

export default function TimesUnavailable({
  titleMessage,
  closeModal
}: { titleMessage: string, closeModal: any }): JSX.Element {
  return <>
    <div className="appointment-unavailable w-100 text-center">
      <header className="booker-header title">
        <p className="mb-2">{titleMessage}</p>
        <p className="">Sorry, no times available. Please select another day.</p>
      </header>
      <FailureSvg />
      <div className="appointment-unavailable-btns mb-3">
        <button className="btn" onClick={closeModal}>Back to calendar</button>
      </div>
      <p className="mt-3 contact-link">Problems? <a href="/contact">Contact us</a></p>
    </div>
  </>;
}
