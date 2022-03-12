import React from "react";

import IAppointmentTypeSelector from "../../../interfaces/IAppointmentTypeSelector";

export function AppointmentTypeSelector({
  appointmentTypeButtons
}: IAppointmentTypeSelector) {
  return <>
      <div className="appointment-type-selector title text-center ">
        <div className="mt-1 mb-1 fade-in">Please select the type of appointment you would like:</div>
        <div className="appointment-type-options mt-1">
          {appointmentTypeButtons}
        </div>
      </div>
    </>;
}
  