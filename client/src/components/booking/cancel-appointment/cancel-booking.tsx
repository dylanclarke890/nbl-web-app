import React, { useState } from "react";
import CustomInput from "../../shared/input/custom-input";

export default function CancelBooking() {
  const [appointmentRef, setAppointmentRef] = useState("");

  const [error, setError] = useState("");

  return (
    <>
      <div className="cancel-booking-wrapper">
        <p className="title">Please enter your booking reference:</p>
        <CustomInput
          inputId="booking-ref-input"
          active={appointmentRef !== ""}
          error={error}
          onChange={setAppointmentRef} />
      </div>
    </>
  )
}