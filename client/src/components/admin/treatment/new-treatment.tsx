import React, { useCallback, useContext, useEffect, useState } from "react";

import { addTreatment } from "../../../services/treatmentService";
import Treatment from "../../../models/treatment";

import TreatmentForm from "../../shared/forms/treatment-form/treatment-form";
import Header from "../../shared/header/header";
import { ToastContext } from "../../../contexts/toast-context/toast-context";

export default function NewTreatment() {
  const { createToast } = useContext(ToastContext);

  const [treatment, setTreatment] = useState(new Treatment("", "", 0, 0, false));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (treatment: Treatment) => {
    setReadyToSubmit(true);
    setTreatment(treatment);
  }

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while saving treatment."), []);
  useEffect(() => {
    if (!readyToSubmit) return;

    const sendData = async () => {
      await addTreatment(treatment);
      setCurrSlide(1);
    }
    sendData().catch(onError);
  }, [treatment, readyToSubmit]);
  /* eslint-enable */

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