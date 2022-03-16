import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { cancelAppointment } from "../../../services/appointmentService";

import AppointmentForm from "../../shared/forms/appointment-form/appointment-form";
import Header from "../../shared/header/header";

export default function DeleteAppointment() {
  const { id } = useParams();
  const [currSlide, setCurrSlide] = useState(0);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const handleConfirm = () => {
    setDeleteConfirmed(true);
  }

  useEffect(() => {
    if (!deleteConfirmed) return;
    const sendData = async () => {
      const res = await cancelAppointment(id!, console.error);
      if (res) {
        setCurrSlide(1)
      } else {
        alert("Failed");
      };
    }
    sendData().catch(console.error);
  }, [deleteConfirmed, id]);

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