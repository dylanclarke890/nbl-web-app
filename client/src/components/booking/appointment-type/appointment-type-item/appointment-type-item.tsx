import React from "react";
import { Link } from "react-router-dom";

import IAppointmentTypeItem from "./IAppointmentTypeItem";

export default function AppointmentTypeItem({
  delay,
  item
}: IAppointmentTypeItem) {
  return (
    <div className={`fade-in delay-${delay}`}>
      <Link className="btn" to={`make-a-booking/${item._id}`}>{item.appointmentType}</Link>
    </div>
  );
}
