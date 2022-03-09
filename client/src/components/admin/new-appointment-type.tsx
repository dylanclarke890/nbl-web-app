import React from "react";
import AppointmentType from "../../models/appointment-type";

import AppointmentTypeForm from "../shared/forms/appointment-type-form";
import Header from "../shared/header/header";

export default function NewAppointmentType() {
  const handleSubmit = (appointment: AppointmentType) => {
    console.log(JSON.stringify(appointment));
  }

  return (
    <>
      <Header headerTitle="New" returnLinkUrl={'../admin/appointment-types'} linkText={'Back to all'} />
      <AppointmentTypeForm onSubmit={handleSubmit} />
    </>
  )
}