import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../../contexts/loading-context/loading-context";
import { ToastContext } from "../../contexts/toast-context/toast-context";
import Treatment from "../../models/treatment";
import { getAllTreatments } from "../../services/treatmentService";

import './treatments.css';

export default function Treatments() {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);
  const [treatmentOptions, setTreatmentOptions] = useState<JSX.Element[]>([]);

  const updateTreatmentSelection = useCallback((treatments: Treatment[]) => {
    const treatmentOptions: JSX.Element[] = [];
    for (let i = 0; i < treatments.length; i++) {
      const el = treatments[i];
      treatmentOptions.push((
        <div key={el._id} className="treatment-option flex">
          <p className="treatment-option-type">{el.type} <span>({el.duration} mins)</span></p>
          <p className="treatment-option-separator"></p>
          <p className="treatment-option-duration">&#163; {el.price}</p>
        </div>
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

  return (
    <>
      <h1 className="title text-center">Treatments</h1>
      <div className="treatments-container mb-3">
        {treatmentOptions}
      </div>
      <div className="flex justify-center mt-3">
        <Link className="btn" to="/make-a-booking/booking-options">Book Now!</Link>
      </div>
    </>
  )
}