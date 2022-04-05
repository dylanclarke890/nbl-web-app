import React, { useCallback, useContext, useEffect, useState } from "react";

import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { getAllTreatments } from "../../../services/treatmentService";

import TreatmentOption from "../treatment/treatment-option/treatment-option";
import TreatmentOptionSelector from "../treatment/treatment-option-selector/treatment-option-selector";
import Treatment from "../../../models/treatment";
import CancellationOption from "../cancel-appointment/cancellation-option";
import { LoadingContext } from "../../../contexts/loading-context/loading-context";

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

  return loading ? null : (
    <>
      <TreatmentOptionSelector treatmentOptionButtons={treatmentOptions} />
      <p className={`sub-title text-center mt-2 fade-in delay-${treatmentOptions.length * 200}`}>Or</p>
      <div className={`fade-in delay-${(treatmentOptions.length * 200) + 200}`}>
        <CancellationOption />
      </div>
    </>
  )
}