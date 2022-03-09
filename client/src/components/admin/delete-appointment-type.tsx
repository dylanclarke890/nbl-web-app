import React from "react";
import { useParams } from "react-router-dom";

export default function DeleteAppointmentType() {
  const { id } = useParams();

  return (
    <>
      <div className="text-center">
        <p>Hello {id}</p>
      </div>
    </>
  )
}