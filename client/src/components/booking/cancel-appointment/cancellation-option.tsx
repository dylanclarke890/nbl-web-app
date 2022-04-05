import React from "react";
import { Link } from "react-router-dom";
import TitleAndDesc from "../../shared/title-and-desc/title-and-desc";

export default function CancellationOption() {
  return (
    <>
      <TitleAndDesc title="Cancel a booking" desc="Cancel an existing appointment." />
      <div className="cancellation-option flex col-center mt-2">
        <Link className="btn cancel-btn" to={'/cancel-booking'}>Cancel A Booking</Link>
      </div>
    </>
  )
}