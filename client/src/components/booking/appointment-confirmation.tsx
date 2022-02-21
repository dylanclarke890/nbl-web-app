import React from "react";
import IAppointmentConfirmation from "../../interfaces/IAppointmentConfirmation";

import './appointment-confirmation.css';

export default function AppointmentConfirmation({ time, date, reference }: IAppointmentConfirmation) {
  return (
    <div className="appointment-confirmation">
      <p className="text-center title">Success!</p>
      <div className="checkmark-wrapper">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      </div>
      <p className="text-center title">Your appointment is confirmed for {date.toDateString()}</p>
      <p className="text-center title">{time}</p>
      <p className="text-center">Your reference is:</p>
      <p className="text-center title">{reference}</p>
    </div>
  )
}