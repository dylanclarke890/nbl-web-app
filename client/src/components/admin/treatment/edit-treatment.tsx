import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { editTreatment } from "../../../services/treatmentService";
import Treatment from "../../../models/treatment";

import TreatmentForm from "../../shared/forms/treatment-form/treatment-form";
import Header from "../../shared/header/header";
import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { LoadingContext } from "../../../contexts/loading-context/loading-context";
import TitleAndDesc from "../../shared/title-and-desc/title-and-desc";

export default function EditTreatment() {
  const { id } = useParams();
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  const [treatment, setTreatment] = useState(new Treatment("", "", 0, 0, false));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (treatment: Treatment) => {
    setTreatment({ ...treatment, _id: id! });
    setReadyToSubmit(true);
  }

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while saving treatment."), []);
  useEffect(() => {
    if (!readyToSubmit || loading) return;
    const sendData = async () => {
      isLoading();
      const res = await editTreatment(treatment);
      if (res) setCurrSlide(1);
      loaded();
    }
    sendData().catch(() => { onError(); loaded(); });;
  }, [treatment, readyToSubmit]);
  /* eslint-disable */

  const titleAndDesc = <TitleAndDesc title="Edit Treatment"  />;
  return currSlide === 0 ? (
    <>
      {titleAndDesc}
      <Header headerTitle={`Edit`} returnLinkUrl={'../admin/treatments'} linkText={'Back to all'} />
      <TreatmentForm id={id} onSubmit={handleSubmit} />
    </>
  ) : (
    <>
      {titleAndDesc}
      <Header headerTitle="Success!" returnLinkUrl={'../admin/treatments'} linkText={'Back to all'} />
    </>
  )
}