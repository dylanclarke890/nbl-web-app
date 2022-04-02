import React from "react";

import IAppointmentConfirmation from "./IAppointmentConfirmation";

import CheckmarkSvg from "../../../shared/svgs/checkmark-svg";

export default function AppointmentConfirmation({ time, date, reference }: IAppointmentConfirmation) {
  return (
    <div className="text-center">
      <p className="title">Success!</p>
      <CheckmarkSvg />
      <p className="title">Your appointment is confirmed for {date.toDateString()}</p>
      <p className="title">{time}</p>
      <p>Your reference is:</p>
      <p className="title">{reference}</p>
    </div>
  )
}