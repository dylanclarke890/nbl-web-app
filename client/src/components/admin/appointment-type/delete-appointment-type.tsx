import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { deleteAppointmentType } from "../../../services/appointmentTypeService";

import AppointmentTypeForm from "../../shared/forms/appointment-type-form/appointment-type-form";
import Header from "../../shared/header/header";

export default function DeleteAppointmentType() {
  const { id } = useParams();
  const [currSlide, setCurrSlide] = useState(0);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const handleConfirm = () => {
    setDeleteConfirmed(true);
  }

  useEffect(() => {
    if (!deleteConfirmed) return;
    const sendData = async () => {
      const res = await deleteAppointmentType(id!, console.error);
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
      <Header headerTitle={`Delete`} returnLinkUrl={'../admin/appointment-types'} linkText={'Back to all'} />
      <AppointmentTypeForm id={id} readOnly />
      <h2 className="title text-center">Are you sure you want to delete this?</h2>
      <div className="flex col-center">
        <button className="btn" onClick={handleConfirm}>Delete</button>
      </div>
    </>
  ) : (
    <>
      <Header headerTitle="Success!" returnLinkUrl={'../admin/appointment-types'} linkText={'Back to all'} />
    </>
  )
}