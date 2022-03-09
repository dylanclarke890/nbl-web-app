import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../shared/header/header";

export default function DeleteAppointmentType() {
  const { id } = useParams();

  return (
    <>
      <Header headerTitle={`Delete ${id}`} returnLinkUrl={'../admin/appointment-types'} linkText={'Back to all'} />
    </>
  )
}