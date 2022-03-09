import React from "react";
import { useParams } from "react-router-dom";
import AppointmentType from "../../models/appointment-type";
import AppointmentTypeForm from "../shared/forms/appointment-type-form";

export default function EditAppointmentType() {
  const { id } = useParams();

  const handleSubmit = (appointment: AppointmentType) => {
    console.log(JSON.stringify(appointment));
  }

  return (
    <>
      <div className="text-center">
        <h3 className="title">Edit {id}</h3>
      </div>
      <AppointmentTypeForm id={id}  onSubmit={handleSubmit} />
    </>
  )
}