import React from "react";

import AppointmentTypeForm from "../shared/forms/appointment-type-form";

export default function NewAppointmentType() {
  const handleSubmit = () => {

  }

  return (
    <>
      <div className="text-center">
        <h3 className="title">New Appointment Type</h3>
      </div>
      <AppointmentTypeForm onSubmit={handleSubmit} />
    </>
  )
}