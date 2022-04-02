import React, { useCallback, useContext, useEffect, useState } from "react";

import { addAppointment } from "../../../services/appointmentService";
import Appointment from "../../../models/appointment";

import AppointmentForm from "../../shared/forms/appointment-form/appointment-form";
import Header from "../../shared/header/header";
import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { LoadingContext } from "../../../contexts/loading-context/loading-context";

export default function NewAppointment() {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  const [appointment, setAppointment] = useState(new Appointment("", "", ""));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (appointment: Appointment) => {
    setReadyToSubmit(true);
    setAppointment(appointment);
  }

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while saving appointment."), []);
  useEffect(() => {
    if (!readyToSubmit || loading) return;
    const sendData = async () => {
      isLoading();
      await addAppointment(appointment, { ...appointment.person }, appointment.date!, appointment.treatment!, () => setCurrSlide(1));
      setCurrSlide(1);
      loaded();
    }
    sendData().catch(() => { onError(); loaded(); });;
  }, [appointment, readyToSubmit]);
  /* eslint-enable */

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