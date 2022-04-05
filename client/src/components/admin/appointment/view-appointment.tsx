import React from "react";
import { useParams } from "react-router-dom";

import AppointmentForm from "../../shared/forms/appointment-form/appointment-form";
import Header from "../../shared/header/header";
import TitleAndDesc from "../../shared/title-and-desc/title-and-desc";

export default function ViewAppointment() {
  const { id } = useParams();

  return (
    <>
      <TitleAndDesc title="View Appointment" desc="" />
      <Header headerTitle={`View`} returnLinkUrl={'../admin/appointments'} linkText={'Back to all'} />
      <AppointmentForm id={id} readOnly />
    </>
  )
}