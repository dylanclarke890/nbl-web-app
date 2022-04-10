import React from "react";
import { Link } from "react-router-dom";

export default function CancellationOption() {
  return (
    <>
      <div className="cancellation-option flex col-center mt-2">
        <Link className="btn btn-sm cancel-btn" to={'/cancel-booking'}>Cancel A Booking?</Link>
      </div>
    </>
  )
}