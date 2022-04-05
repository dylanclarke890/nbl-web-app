import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { editAppointment } from "../../../services/appointmentService";
import Appointment from "../../../models/appointment";

import AppointmentForm from "../../shared/forms/appointment-form/appointment-form";
import Header from "../../shared/header/header";
import { LoadingContext } from "../../../contexts/loading-context/loading-context";
import TitleAndDesc from "../../shared/title-and-desc/title-and-desc";

export default function EditAppointment() {
  const { id } = useParams();
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  const [appointment, setAppointment] = useState(new Appointment("", "", ""));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (a: Appointment) => {
    setAppointment(new Appointment(a.id, a.from, a.to, a.person, a.treatment, a.date));
    setReadyToSubmit(true);
  }

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while saving appointment."), []);
  useEffect(() => {
    if (!readyToSubmit || loading) return;
    const sendData = async () => {
      isLoading();
      const res = await editAppointment(appointment);
      if (res) setCurrSlide(1);
      loaded();
    }
    sendData().catch(() => { onError(); loaded(); });
  }, [appointment, readyToSubmit]);
  /* eslint-enable */

  const titleAndDesc = <TitleAndDesc title="Edit Appointment"  />
  return currSlide === 0 ? (
    <>
      {titleAndDesc}
      <Header headerTitle={`Edit`} returnLinkUrl={'../admin/appointments'} linkText={'Back to all'} />
      <AppointmentForm id={id} onSubmit={handleSubmit} />
    </>
  ) : (
    <>
      {titleAndDesc}
      <Header headerTitle="Success!" returnLinkUrl={'../admin/appointments'} linkText={'Back to all'} />
    </>
  )
}