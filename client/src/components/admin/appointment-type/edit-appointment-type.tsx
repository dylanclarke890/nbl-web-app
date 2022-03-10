import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppointmentType from "../../../models/appointment-type";
import { editAppointmentType } from "../../../services/appointmentTypeService";
import AppointmentTypeForm from "../../shared/forms/appointment-type-form";
import Header from "../../shared/header/header";

export default function EditAppointmentType() {
  const { id } = useParams();

  const [appointmentType, setAppointmentType] = useState(new AppointmentType("", "", 0, 0, false));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (appointmentType: AppointmentType) => {
    setReadyToSubmit(true);
    setAppointmentType({ ...appointmentType, _id: id! });
  }

  useEffect(() => {
    if (!readyToSubmit) return;

    const sendData = async () => {
      const res = await editAppointmentType(appointmentType, console.error);
      if (res) {
        setCurrSlide(1)
      } else {
        alert("Failed");
      };
    }
    sendData().catch(console.error);
  }, [appointmentType, readyToSubmit]);
  return currSlide === 0 ? (
    <>
      <Header headerTitle={`Edit`} returnLinkUrl={'../admin/appointment-types'} linkText={'Back to all'} />
      <AppointmentTypeForm id={id} onSubmit={handleSubmit} />
    </>
  ) : (
    <>
      <Header headerTitle="Success!" returnLinkUrl={'../admin/appointment-types'} linkText={'Back to all'} />
    </>
  )
}