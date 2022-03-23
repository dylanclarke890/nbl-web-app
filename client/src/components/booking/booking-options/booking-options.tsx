import React, { useCallback, useContext, useEffect, useState } from "react";

import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { getAllTreatments } from "../../../services/treatmentService";

import TreatmentOption from "../treatment/treatment-option/treatment-option";
import TreatmentOptionSelector from "../treatment/treatment-option-selector/treatment-option-selector";
import Treatment from "../../../models/treatment";
import CancellationOption from "../cancel-appointment/cancellation-option";

export default function BookingOptions() {
  const { createToast } = useContext(ToastContext);

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


  const onError = () => createToast("Error", "Unexpected error, please try again.");
  useEffect(() => {
    const fetchData = async () => {
      await getAllTreatments(updateTreatmentSelection, onError);
    }
    fetchData().catch(console.error);
  }, [updateTreatmentSelection]);

  return (
    <>
      <TreatmentOptionSelector treatmentOptionButtons={treatmentOptions} />
      <p className="sub-title text-center mt-2">Or</p>
      <CancellationOption />
    </>
  )
}