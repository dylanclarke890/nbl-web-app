import React, { useEffect, useState } from "react";

import { getAppointmentType } from "../../../services/appointmentTypeService";
import IAppointmentTypeForm from "../../../interfaces/IAppointmentTypeForm";
import AppointmentType from "../../../models/appointment-type";

import CustomCheckbox from "../input/custom-checkbox";
import CustomInput from "../input/custom-input";
import './appointment-type-form.css'

export default function AppointmentTypeForm({ id, onSubmit, readOnly }: IAppointmentTypeForm) {

  const [appointmentType, setAppointmentType] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [modelValidation, setModelValidation] = useState({
    appointmentType: "",
    duration: "",
    price: "",
  });


  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const result = await getAppointmentType(id, console.error);
      setAppointmentType(result.appointmentType);
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

    const model = new AppointmentType(id!, appointmentType, parseInt(duration), parseFloat(price), isActive);
    onSubmit!(model);
  }
  const submitButton = onSubmit ? <button className="btn" onClick={forwardClick}>Save</button> : null;

  return (
    <>
      <div className="appointment-type-form">
        <CustomInput inputId={"name"}
          value={appointmentType}
          active={appointmentType !== ""}
          error={modelValidation.appointmentType}
          onChange={setAppointmentType}
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
            disabled={readOnly} />
          {submitButton}
        </div>
      </div>
    </>
  )
}