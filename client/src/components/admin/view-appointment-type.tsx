import React from "react";
import { useParams } from "react-router-dom";
import AppointmentTypeForm from "./appointment-type-form";

export default function ViewAppointmentType() {
  const { id } = useParams();

  return (
    <>
      <div className="text-center">
        <p>Hello {id}</p>
      </div>
      <AppointmentTypeForm />
    </>
  )
}