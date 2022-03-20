import React, { useEffect, useState } from "react";

import { addAppointment } from "../../../services/appointmentService";
import Appointment from "../../../models/appointment";

import AppointmentForm from "../../shared/forms/appointment-form/appointment-form";
import Header from "../../shared/header/header";

export default function NewAppointment() {
  const [appointment, setAppointment] = useState(new Appointment("", "", ""));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (appointment: Appointment) => {
    setReadyToSubmit(true);
    setAppointment(appointment);
  }

  useEffect(() => {
    if (!readyToSubmit) return;

    const sendData = async () => {
      await addAppointment(appointment, { ...appointment.person }, appointment.date!, appointment.treatment!, () => setCurrSlide(1), console.error);
      setCurrSlide(1);
    }
    sendData().catch(console.error);
  }, [appointment, readyToSubmit]);

  return currSlide === 0 ? (
    <>
      <Header headerTitle="New" returnLinkUrl={'../admin/appointments'} linkText={'Back to all'} />
      <AppointmentForm onSubmit={handleSubmit} />
    </>
  ) : (
    <>
      <Header headerTitle="Success!" returnLinkUrl={'../admin/appointments'} linkText={'Back to all'} />
    </>
  )
}