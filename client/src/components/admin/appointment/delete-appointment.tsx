import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { cancelAppointment } from "../../../services/appointmentService";

import AppointmentForm from "../../shared/forms/appointment-form/appointment-form";
import Header from "../../shared/header/header";

export default function DeleteAppointment() {
  const { id } = useParams();
  const { createToast } = useContext(ToastContext);

  const [currSlide, setCurrSlide] = useState(0);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const handleConfirm = () => {
    setDeleteConfirmed(true);
  }

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while cancelling."), []);
  useEffect(() => {
    if (!id || !deleteConfirmed) return;
    const sendData = async () => {
      const res = await cancelAppointment(id);
      if (res) setCurrSlide(1);
    }
    sendData().catch(onError);
  }, [id, deleteConfirmed]);
  /* eslint-enable */

  return currSlide === 0 ? (
    <>
      <Header headerTitle={`Delete`} returnLinkUrl={'../admin/appointments'} linkText={'Back to all'} />
      <AppointmentForm id={id} readOnly />
      <h2 className="title text-center">Are you sure you want to delete this?</h2>
      <div className="flex col-center">
        <button className="btn" onClick={handleConfirm}>Delete</button>
      </div>
    </>
  ) : (
    <>
      <Header headerTitle="Success!" returnLinkUrl={'../admin/appointments'} linkText={'Back to all'} />
    </>
  )
}