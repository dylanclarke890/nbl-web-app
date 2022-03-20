import React, { useEffect, useState } from "react";

import { addTreatment } from "../../../services/treatmentService";
import Treatment from "../../../models/treatment";

import TreatmentForm from "../../shared/forms/treatment-form/treatment-form";
import Header from "../../shared/header/header";

export default function NewTreatment() {
  const [treatment, setTreatment] = useState(new Treatment("", "", 0, 0, false));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (treatment: Treatment) => {
    setReadyToSubmit(true);
    setTreatment(treatment);
  }

  useEffect(() => {
    if (!readyToSubmit) return;

    const sendData = async () => {
      await addTreatment(treatment, console.error);
      setCurrSlide(1);
    }
    sendData().catch(console.error);
  }, [treatment, readyToSubmit]);

  return currSlide === 0 ? (
    <>
      <Header headerTitle="New" returnLinkUrl={'../admin/treatments'} linkText={'Back to all'} />
      <TreatmentForm onSubmit={handleSubmit} />
    </>
  ) : (
    <>
      <Header headerTitle="Success!" returnLinkUrl={'../admin/treatments'} linkText={'Back to all'} />
    </>
  )
}