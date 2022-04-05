import React from "react";
import { useParams } from "react-router-dom";

import TreatmentForm from "../../shared/forms/treatment-form/treatment-form";
import Header from "../../shared/header/header";
import TitleAndDesc from "../../shared/title-and-desc/title-and-desc";

export default function ViewTreatment() {
  const { id } = useParams();

  return (
    <>
      <TitleAndDesc title="View Treatment"  />
      <Header headerTitle={`View`} returnLinkUrl={'../admin/treatments'} linkText={'Back to all'} />
      <TreatmentForm id={id} readOnly />
    </>
  )
}