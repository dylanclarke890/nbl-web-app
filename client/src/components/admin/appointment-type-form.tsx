import React, { useState } from "react";

import CustomInput from "../shared/input/custom-input";
import * as Validation from '../../helpers/validation'

export default function AppointmentTypeForm() {

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(false);

  const modelValidation = {
    name: "",
    duration: "",
    price: "",
  }

  return (
    <>
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
    </>
  )
}