import React, { useEffect, useState } from "react";

import { getAppointment } from "../../../services/appointmentService";
import Appointment from "../../../models/appointment";

import CustomInput from "../input/custom-input";
import "./appointment-type-form.css";
import IAppointmentForm from "../../../interfaces/IAppointmentForm";

export default function AppointmentForm({ id, onSubmit, readOnly }: IAppointmentForm): JSX.Element {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [appointmentType, setAppointmentType] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [modelValidation, setModelValidation] = useState({
    from: "",
    to: "",
    date: "",
    appointmentType: "",
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const result = await getAppointment(id, console.error);
      setFrom(result.from);
      setTo(result.to);
      setDate(result.date!);
      setAppointmentType(result.appointmentType!);
      setName(result.person?.name!);
      setEmail(result.person?.email!);
      setPhone(result.person?.phone!);
    };
    fetchData().catch(console.error);
  }, [id]);

  const forwardClick = () => {
    if (!onSubmit) return;

    const model = new Appointment(
      id!,
      from,
      to,
      { name, phone, email },
      appointmentType,
      date
    );
    onSubmit!(model);
  };

  const submitButton = onSubmit ? <button className="btn" onClick={forwardClick}>Save</button> : null;

  return (
    <>
      <div className="appointment-type-form">
        <CustomInput inputId={"name"}
          value={name}
          active={name !== ""}
          error={modelValidation.name}
          onChange={setName}
          readonly={readOnly}
        />
        <CustomInput inputId={"email"}
          value={email}
          active={email !== ""}
          error={modelValidation.email}
          onChange={setEmail}
          readonly={readOnly}
        />
        <CustomInput inputId={"phone"}
          value={phone}
          active={phone !== ""}
          error={modelValidation.phone}
          onChange={setPhone}
          readonly={readOnly}
        />
        <CustomInput inputId={"from"}
          value={from}
          active={from !== ""}
          error={modelValidation.from}
          onChange={setFrom}
          readonly={readOnly}
        />
        <CustomInput inputId={"to"}
          value={to}
          active={to !== ""}
          error={modelValidation.to}
          onChange={setTo}
          readonly={readOnly}
        />
        <CustomInput inputId={"date"}
          value={date.toDateString()}
          active={date.toDateString() !== ""}
          error={modelValidation.date}
          onChange={setDate}
          readonly={readOnly}
        />
        {submitButton}
      </div>
    </>
  )
}
