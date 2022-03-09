import React from "react";
import { useParams } from "react-router-dom";
import AppointmentTypeForm from "../shared/forms/appointment-type-form";

export default function ViewAppointmentType() {
  const { id } = useParams();

  const handleSubmit = () => {

  }

  return (
    <>
      <div className="text-center">
        <h3 className="title">View {id}</h3>
      </div>
      <AppointmentTypeForm id={id} onSubmit={handleSubmit} />
    </>
  )
}