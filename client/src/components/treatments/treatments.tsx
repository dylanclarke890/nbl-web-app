import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../../contexts/loading-context/loading-context";
import { ToastContext } from "../../contexts/toast-context/toast-context";
import Treatment from "../../models/treatment";
import { getAllTreatments } from "../../services/treatmentService";
import TitleAndDesc from "../shared/title-and-desc/title-and-desc";
import TreatmentItem from "./treatment-item/treatment-item";

import './treatments.css';

export default function Treatments() {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);
  const [treatmentOptions, setTreatmentOptions] = useState<JSX.Element[]>([]);

  const updateTreatmentSelection = useCallback((treatments: Treatment[]) => {
    const treatmentOptions: JSX.Element[] = [];
    for (let i = 0; i < treatments.length; i++) {
      treatmentOptions.push((
        <div className={`fade-in delay-${i * 200}`}>
          <TreatmentItem key={treatments[i]._id} treatment={treatments[i]} />
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
  const titleAndDesc = <TitleAndDesc title="Treatments" desc="Check out our services!" />
  return loading ? titleAndDesc : (
    <>
      {titleAndDesc}
      <h1 className="title text-center">Treatments</h1>
      <div className="treatments-container mb-3">
        {treatmentOptions}
      </div>
      <div className="flex justify-center mt-3">
        <Link className="btn" to="/booking-options">Book Now!</Link>
      </div>
    </>
  )
}