import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../../../contexts/loading-context/loading-context";

import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { cancelAppointment } from "../../../services/appointmentService";

import AppointmentForm from "../../shared/forms/appointment-form/appointment-form";
import Header from "../../shared/header/header";
import TitleAndDesc from "../../shared/title-and-desc/title-and-desc";

export default function DeleteAppointment() {
  const { id } = useParams();
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  const [currSlide, setCurrSlide] = useState(0);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const handleConfirm = () => {
    setDeleteConfirmed(true);
  }

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while deleting appointment."), []);
  useEffect(() => {
    if (!id || !deleteConfirmed || loading) return;
    const sendData = async () => {
      isLoading();
      const res = await cancelAppointment(id);
      if (res) setCurrSlide(1);
      loaded();
    }
    sendData().catch(() => { onError(); loaded(); });
  }, [id, deleteConfirmed]);
  /* eslint-enable */

  const titleAndDesc = <TitleAndDesc title="Delete Appointment" desc="" />
  return currSlide === 0 ? (
    <>
      {titleAndDesc}
      <Header headerTitle={`Delete`} returnLinkUrl={'../admin/appointments'} linkText={'Back to all'} />
      <AppointmentForm id={id} readOnly />
      <h2 className="title text-center">Are you sure you want to delete this?</h2>
      <div className="flex col-center">
        <button className="btn" onClick={handleConfirm}>Delete</button>
      </div>
    </>
  ) : (
    <>
      {titleAndDesc}
      <Header headerTitle="Success!" returnLinkUrl={'../admin/appointments'} linkText={'Back to all'} />
    </>
  )
}