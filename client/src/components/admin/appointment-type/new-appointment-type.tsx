import React, { useEffect, useState } from "react";
import AppointmentType from "../../../models/appointment-type";
import { addAppointmentType } from "../../../services/appointmentTypeService";

import AppointmentTypeForm from "../../shared/forms/appointment-type-form";
import Header from "../../shared/header/header";

export default function NewAppointmentType() {
  const [appointmentType, setAppointmentType] = useState(new AppointmentType("", "", 0, 0, false));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (appointmentType: AppointmentType) => {
    setReadyToSubmit(true);
    setAppointmentType(appointmentType);
  }

  useEffect(() => {
    if (!readyToSubmit) return;

    const sendData = async () => {
      await addAppointmentType(appointmentType, console.error);
      setCurrSlide(1);
    }
    sendData().catch(console.error);
  }, [appointmentType, readyToSubmit]);

  return currSlide === 0 ? (
    <>
      <Header headerTitle="New" returnLinkUrl={'../admin/appointment-types'} linkText={'Back to all'} />
      <AppointmentTypeForm onSubmit={handleSubmit} />
    </>
  ) : (
    <>
      <Header headerTitle="Success!" returnLinkUrl={'../admin/appointment-types'} linkText={'Back to all'} />
    </>
  )
}