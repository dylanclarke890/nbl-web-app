import React, { useCallback, useEffect, useState } from "react";

import { getAllTreatments } from "../../../services/treatmentService";

import IToast from "../../shared/toast/IToast";
import Toast from "../../shared/toast/toast";
import createToast from "../../shared/toast/toast-helper";
import TreatmentOption from "../treatment/treatment-option/treatment-option";
import TreatmentOptionSelector from "../treatment/treatment-option-selector/treatment-option-selector";
import Treatment from "../../../models/treatment";
import CancellationOption from "../cancel-appointment/cancellation-option";

export default function BookingOptions() {
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

  useEffect(() => {
    const fetchData = async () => {
      await getAllTreatments(updateTreatmentSelection, createErrorToast);
    }
    fetchData().catch(console.error);
  }, [updateTreatmentSelection]);

  const [toastList, setToastList] = useState(new Array<IToast>());
  const createErrorToast = () => {
    setToastList(t => [...t, createToast("Error", "Unexpected error.")]);
  }

  return (
    <>
      <TreatmentOptionSelector treatmentOptionButtons={treatmentOptions} />
      <p className="sub-title text-center mt-2">Or</p>
      <CancellationOption />
      <Toast autoDelete={true} autoDeleteTime={2000} toastList={toastList} setToastList={setToastList} position={'top-right'} />
    </>
  )
}