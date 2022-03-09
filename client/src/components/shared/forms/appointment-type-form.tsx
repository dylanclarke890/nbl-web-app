import React, { useState } from "react";

import CustomInput from "../input/custom-input";
import CustomCheckbox from "../input/custom-checkbox";

import './appointment-type-form.css'
import IAppointmentTypeForm from "../../../interfaces/IAppointmentTypeForm";
import AppointmentType from "../../../models/appointment-type";

export default function AppointmentTypeForm({ id, onSubmit, readOnly }: IAppointmentTypeForm) {

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleisActiveChange = () => {
    setIsActive(!isActive);
  };

  const forwardClick = () => {
    if (!id || !onSubmit) return;

    const model = new AppointmentType(id!, name, parseInt(duration), parseFloat(price), isActive);
    onSubmit!(model);
  }
  const submitButton = onSubmit ? <button className="btn" onClick={forwardClick}>Save</button> : null;

  const modelValidation = {
    name: "",
    duration: "",
    price: "",
  }

  return (
    <>
      <div className="appointment-type-form">
        <CustomInput inputId={"name"}
          active={name !== ""}
          error={modelValidation.name}
          onChange={setName}
          readonly={readOnly}
        />
        <CustomInput inputId={"duration"}
          active={duration !== ""}
          error={modelValidation.duration}
          onChange={setDuration}
          readonly={readOnly}
        />
        <CustomInput inputId={"price"}
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
            disabled={readOnly} />
          {submitButton}
        </div>
      </div>
    </>
  )
}