import React from "react";
import { useParams } from "react-router-dom";
import AppointmentTypeForm from "../shared/forms/appointment-type-form";
import Header from "../shared/header/header";

export default function ViewAppointmentType() {
  const { id } = useParams();

  const handleSubmit = () => {

  }

  return (
    <>
      <Header headerTitle={`View ${id}`} returnLinkUrl={'../admin/appointment-types'} linkText={'Back to all'} />
      <AppointmentTypeForm id={id} onSubmit={handleSubmit} />
    </>
  )
}