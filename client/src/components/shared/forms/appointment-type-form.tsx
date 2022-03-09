import React, { useState } from "react";

import CustomInput from "../input/custom-input";
import * as Validation from '../../../helpers/validation'
import CustomCheckbox from "../input/custom-checkbox";

import './appointment-type-form.css'
import IAppointmentTypeForm from "../../../interfaces/IAppointmentTypeForm";
import AppointmentType from "../../../models/appointment-type";

export default function AppointmentTypeForm({ id, onSubmit }: IAppointmentTypeForm) {

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleisActiveChange = () => {
    setIsActive(!isActive);
  };

  const forwardClick = () => {
    if (!id) return;

    const model = new AppointmentType(id!, name, parseInt(duration), parseFloat(price), isActive);
    onSubmit(model);
  }

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
          onKeyPress={Validation.emptyKeyBoardEventHandler}
        />
        <CustomInput inputId={"duration"}
          active={duration !== ""}
          error={modelValidation.duration}
          onChange={setDuration}
          onKeyPress={Validation.handleNumberKeyPress}
        />
        <CustomInput inputId={"price"}
          active={price !== ""}
          error={modelValidation.price}
          onChange={setPrice}
          onKeyPress={Validation.emptyKeyBoardEventHandler}
        />
        <div className="center-content">
          <CustomCheckbox inputId="isActive"
            labelText="Show option to customers?"
            isChecked={isActive}
            onChange={handleisActiveChange} />
          <button className="btn" onClick={forwardClick}>Save</button>
        </div>
      </div>
    </>
  )
}