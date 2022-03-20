import React from "react";
import { useParams } from "react-router-dom";

import TreatmentForm from "../../shared/forms/treatment-form/treatment-form";
import Header from "../../shared/header/header";

export default function ViewTreatment() {
  const { id } = useParams();

  return (
    <>
      <Header headerTitle={`View`} returnLinkUrl={'../admin/treatments'} linkText={'Back to all'} />
      <TreatmentForm id={id} readOnly />
    </>
  )
}