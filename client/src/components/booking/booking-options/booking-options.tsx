import React, { useCallback, useContext, useEffect, useState } from "react";

import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { getAllTreatments } from "../../../services/treatmentService";

import TreatmentOption from "../treatment/treatment-option/treatment-option";
import TreatmentOptionSelector from "../treatment/treatment-option-selector/treatment-option-selector";
import Treatment from "../../../models/treatment";
import CancellationOption from "../cancel-appointment/cancellation-option";
import { LoadingContext } from "../../../contexts/loading-context/loading-context";
import TitleAndDesc from "../../shared/title-and-desc/title-and-desc";

export default function BookingOptions() {
  const { createToast } = useContext(ToastContext);
  const { isLoading, loaded, loading } = useContext(LoadingContext);

  const [treatmentOptions, setTreatmentOptions] = useState<JSX.Element[]>([]);
  const updateTreatmentSelection = useCallback((treatments: Treatment[]) => {
    const treatmentOptions: JSX.Element[] = [];
    for (let i = 0; i < treatments.length; i++) {
      const el = treatments[i];
      treatmentOptions.push((
        <TreatmentOption key={el._id} delay={i * 200} item={el} />
      ));
    }
    setTreatmentOptions([...treatmentOptions]);
  }, [])

  /* eslint-disable */
  const onError = useCallback(() => createToast("Error", "Error while loading treatments."), []);
  useEffect(() => {
    if (loading) return;
    const fetchData = async () => {
      isLoading();
      await getAllTreatments(updateTreatmentSelection, false);
      loaded();
    }
    fetchData().catch(() => { onError(); loaded(); });;
  }, []);
  /* eslint-enable */
  const titleAndDesc = <TitleAndDesc title="Select a treatment" desc="Book your treatment today!" />
  return loading ? titleAndDesc : (
    <>
      {titleAndDesc}
      <TreatmentOptionSelector treatmentOptionButtons={treatmentOptions} />
      <div className={`fade-in delay-${(treatmentOptions.length * 200)}`}>
        <CancellationOption />
      </div>
    </>
  )
}