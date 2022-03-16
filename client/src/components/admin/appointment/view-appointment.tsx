import React from "react";
import { useParams } from "react-router-dom";

import AppointmentForm from "../../shared/forms/appointment-form";
import Header from "../../shared/header/header";

export default function ViewAppointment() {
  const { id } = useParams();

  return (
    <>
      <Header headerTitle={`View`} returnLinkUrl={'../admin/appointments'} linkText={'Back to all'} />
      <AppointmentForm id={id} readOnly />
    </>
  )
}