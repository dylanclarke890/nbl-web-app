import React from "react";

import IAppointmentConfirmation from "./IAppointmentConfirmation";

import CheckmarkSvg from "../../../shared/svgs/checkmark-svg";

export default function AppointmentConfirmation({ time, date, reference }: IAppointmentConfirmation) {
  return (
    <section className="text-center">
      <h1 className="title">Success!</h1>
      <CheckmarkSvg />
      <h2 className="title">Your appointment is confirmed for {date.toDateString()}</h2>
      <h2 className="title">{time}</h2>
      <p>Your reference is:</p>
      <h2 className="title">{reference}</h2>
    </section>
  )
}