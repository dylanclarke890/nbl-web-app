import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { editTreatment } from "../../../services/treatmentService";
import Treatment from "../../../models/treatment";

import TreatmentForm from "../../shared/forms/treatment-form/treatment-form";
import Header from "../../shared/header/header";

export default function EditTreatment() {
  const { id } = useParams();

  const [treatment, setTreatment] = useState(new Treatment("", "", 0, 0, false));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (treatment: Treatment) => {
    setTreatment({ ...treatment, _id: id! });
    setReadyToSubmit(true);
  }

  useEffect(() => {
    if (!readyToSubmit) return;
    const sendData = async () => {
      const res = await editTreatment(treatment, console.error);
      if (res) {
        setCurrSlide(1)
      } else {
        alert("Failed");
      };
    }
    sendData().catch(console.error);
  }, [treatment, readyToSubmit]);

  return currSlide === 0 ? (
    <>
      <Header headerTitle={`Edit`} returnLinkUrl={'../admin/treatments'} linkText={'Back to all'} />
      <TreatmentForm id={id} onSubmit={handleSubmit} />
    </>
  ) : (
    <>
      <Header headerTitle="Success!" returnLinkUrl={'../admin/treatments'} linkText={'Back to all'} />
    </>
  )
}