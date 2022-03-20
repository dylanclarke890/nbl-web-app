import React, { useEffect, useState } from "react";

import { getTreatment } from "../../../../services/treatmentService";
import ITreatmentForm from "./ITreatmentForm";
import Treatment from "../../../../models/treatment";

import CustomCheckbox from "../../input/custom-checkbox/custom-checkbox";
import CustomInput from "../../input/custom-input/custom-input";
import './treatment-form.css'

export default function TreatmentForm({ id, onSubmit, readOnly }: ITreatmentForm) {

  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [modelValidation, setModelValidation] = useState({
    type: "",
    duration: "",
    price: "",
  });


  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const result = await getTreatment(id, console.error);
      setType(result.type);
      setDuration(result.duration);
      setPrice(result.price);
      setIsActive(result.isActive);
    }
    fetchData().catch(console.error);

  }, [id]);


  const handleisActiveChange = () => {
    setIsActive(!isActive);
  };

  const forwardClick = () => {
    if (!onSubmit) return;

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
          onChange={setType}
          readonly={readOnly}
        />
        <CustomInput inputId={"duration"}
          value={duration}
          active={duration !== ""}
          error={modelValidation.duration}
          onChange={setDuration}
          readonly={readOnly}
        />
        <CustomInput inputId={"price"}
          value={price}
          active={price !== ""}
          error={modelValidation.price}
          onChange={setPrice}
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