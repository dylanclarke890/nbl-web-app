import React from "react";

import IAppointmentTypeItem from "../../../interfaces/IAppointmentTypeItem";
export default function AppointmentTypeItem({
  delay,
  selectAppointmentType,
  item
}: IAppointmentTypeItem) {
  return (
    <div className={`fade-in delay-${delay}`}>
      <button className="btn" onClick={() => selectAppointmentType(item)}>{item.appointmentType}</button>
    </div>
  );
}
