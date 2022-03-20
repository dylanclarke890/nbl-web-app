import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { editAppointment } from "../../../services/appointmentService";
import Appointment from "../../../models/appointment";

import AppointmentForm from "../../shared/forms/appointment-form/appointment-form";
import Header from "../../shared/header/header";

export default function EditAppointment() {
  const { id } = useParams();

  const [appointment, setAppointment] = useState(new Appointment("", "", ""));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (a: Appointment) => {
    setAppointment(new Appointment(a.id, a.from, a.to, a.person, a.treatmentName, a.date));
    setReadyToSubmit(true);
  }

  useEffect(() => {
    if (!readyToSubmit) return;
    const sendData = async () => {
      const res = await editAppointment(appointment, console.error);
      if (res) {
        setCurrSlide(1)
      } else {
        alert("Failed");
      };
    }
    sendData().catch(console.error);
  }, [appointment, readyToSubmit]);

  return currSlide === 0 ? (
    <>
      <Header headerTitle={`Edit`} returnLinkUrl={'../admin/appointments'} linkText={'Back to all'} />
      <AppointmentForm id={id} onSubmit={handleSubmit} />
    </>
  ) : (
    <>
      <Header headerTitle="Success!" returnLinkUrl={'../admin/appointments'} linkText={'Back to all'} />
    </>
  )
}