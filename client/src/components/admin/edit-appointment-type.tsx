import React from "react";
import { useParams } from "react-router-dom";
import AppointmentType from "../../models/appointment-type";
import AppointmentTypeForm from "../shared/forms/appointment-type-form";
import Header from "../shared/header/header";

export default function EditAppointmentType() {
  const { id } = useParams();

  const handleSubmit = (appointment: AppointmentType) => {
    console.log(JSON.stringify(appointment));
  }

  return (
    <>
      <Header headerTitle={`Edit ${id}`} returnLinkUrl={'../admin/appointment-types'} linkText={'Back to all'} />
      <AppointmentTypeForm id={id} onSubmit={handleSubmit} />
    </>
  )
}