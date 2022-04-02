import React, { useCallback, useContext, useEffect, useState } from "react";

import * as Validation from '../../../../helpers/validation';
import { getTreatment } from "../../../../services/treatmentService";
import ITreatmentForm from "./ITreatmentForm";
import Treatment from "../../../../models/treatment";

import CustomCheckbox from "../../input/custom-checkbox/custom-checkbox";
import CustomInput from "../../input/custom-input/custom-input";
import './treatment-form.css'
import { ToastContext } from "../../../../contexts/toast-context/toast-context";
import { LoadingContext } from "../../../../contexts/loading-context/loading-context";

export default function TreatmentForm({ id, onSubmit, readOnly }: ITreatmentForm) {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while loading treatment."), []);
  useEffect(() => {
    if (!id || loading) return;
    const fetchData = async () => {
      isLoading();
      const result = await getTreatment(id);
      setType(result.type);
      setDuration(result.duration);
      setPrice(result.price);
      setIsActive(result.isActive);
      loaded();
    }
    fetchData().catch(() => { onError(); loaded(); });
  }, [id]);
  /* eslint-enable */

  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [modelValidation, setModelValidation] = useState({
    type: "",
    duration: "",
    price: "",
    error: false
  });
  const handleisActiveChange = () => {
    setIsActive(!isActive);
  };

  const isValidType = (t = type) => {
    if (t.length === 0) {
      setModelValidation((curr) => ({
        ...curr,
        type: "Needs a treatment name.",
        error: true
      }))
      return false;
    } else {
      setModelValidation((curr) => ({
        ...curr,
        type: "",
        error: false
      }))
    }

    return true;
  }
  const isValidDuration = (d = duration) => {
    if (d.length === 0) {
      setModelValidation((curr) => ({
        ...curr,
        duration: "Needs a duration.",
        error: true
      }))
      return false;
    } else {
      setModelValidation((curr) => ({
        ...curr,
        duration: "",
        error: false
      }))
    }
    return true;
  }
  const isValidPrice = (p = price) => {
    if (p.length === 0) {
      setModelValidation((curr) => ({
        ...curr,
        price: "Needs a price.",
        error: true
      }))
      return false;
    } else {
      setModelValidation((curr) => ({
        ...curr,
        price: "",
        error: false
      }))
    }
    const firstPointIndex = p.indexOf(".");
    if (firstPointIndex !== p.lastIndexOf(".") || (firstPointIndex !== -1 && (p.length - 1) - firstPointIndex !== 2)) {
      setModelValidation((curr) => ({
        ...curr,
        price: "Invalid price.",
        error: true
      }))
      return false;
    } else {
      setModelValidation((curr) => ({
        ...curr,
        price: "",
        error: false
      }))
    }

    return true;
  }
  const updateType = (v: string) => {
    setType(v);
    isValidType(v);
  }
  const updateDuration = (v: string) => {
    setDuration(v);
    isValidDuration(v);
  }
  const updatePrice = (v: string) => {
    setPrice(v);
    isValidPrice(v);
  }

  const forwardClick = () => {
    if (!onSubmit) return;
    if (modelValidation.error) return;

    const model = new Treatment(id!, type, parseInt(duration), parseFloat(price), isActive);
    onSubmit!(model);
  }
  const submitButton = onSubmit ? <button className="btn" onClick={forwardClick}>Save</button> : null;

  return (
    <>
      <div className="treatment-form">
        <CustomInput inputId={"name"}
          value={type}
          active={type !== ""}
          error={modelValidation.type}
          onChange={updateType}
          readonly={readOnly}
        />
        <CustomInput inputId={"duration"}
          value={duration}
          labelText="duration (mins)"
          active={duration !== ""}
          error={modelValidation.duration}
          onKeyPress={Validation.handleNumberKeyPress}
          onChange={updateDuration}
          readonly={readOnly}
        />
        <CustomInput inputId={"price"}
          value={price}
          active={price !== ""}
          error={modelValidation.price}
          onKeyPress={Validation.handlePriceNumberKeyPress}
          onChange={updatePrice}
          readonly={readOnly}
        />
        <div className="center-content">
          <CustomCheckbox inputId="isActive"
            labelText="Show option to customers?"
            isChecked={isActive}
            onChange={handleisActiveChange}
            readOnly={readOnly} />
          {submitButton}
        </div>
      </div>
    </>
  )
}