import React from "react";
import IAppointmentConfirmation from "../../interfaces/IAppointmentConfirmation";
import CheckmarkSvg from "../shared/svgs/checkmark-svg";

import './appointment-confirmation.css';

export default function AppointmentConfirmation({ time, date, reference }: IAppointmentConfirmation) {
  return (
    <div className="appointment-confirmation text-center">
      <p className="title">Success!</p>
      <CheckmarkSvg />
      <p className="title">Your appointment is confirmed for {date.toDateString()}</p>
      <p className="title">{time}</p>
      <p>Your reference is:</p>
      <p className="title">{reference}</p>
    </div>
  )
      }