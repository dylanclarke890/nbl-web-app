import React, { useCallback, useContext, useEffect, useState } from "react";

import { addTreatment } from "../../../services/treatmentService";
import Treatment from "../../../models/treatment";

import TreatmentForm from "../../shared/forms/treatment-form/treatment-form";
import Header from "../../shared/header/header";
import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { LoadingContext } from "../../../contexts/loading-context/loading-context";
import TitleAndDesc from "../../shared/title-and-desc/title-and-desc";

export default function NewTreatment() {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

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
    if (!readyToSubmit || loading) return;
    const sendData = async () => {
      isLoading();
      await addTreatment(treatment);
      setCurrSlide(1);
      loaded();
    }
    sendData().catch(() => { onError(); loaded(); });;
  }, [treatment, readyToSubmit]);
  /* eslint-enable */

  const titleAndDesc = <TitleAndDesc title="New Treatment" desc="" />;
  return currSlide === 0 ? (
    <>
      {titleAndDesc}
      <Header headerTitle="New" returnLinkUrl={'../admin/treatments'} linkText={'Back to all'} />
      <TreatmentForm onSubmit={handleSubmit} />
    </>
  ) : (
    <>
      {titleAndDesc}
      <Header headerTitle="Success!" returnLinkUrl={'../admin/treatments'} linkText={'Back to all'} />
    </>
  )
}