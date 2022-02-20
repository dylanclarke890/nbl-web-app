import React, { useState } from "react";

import { format } from "date-fns";
import "./appointment-picker.css";
import ContactForm from "../shared/input/contact-form";
import useOnInitialized from "../../custom-hooks/onInitialized";
import IAppointmentPicker from "../../interfaces/IAppointmentPicker";

export default function AppointmentPicker({
  closeModal,
  availableTimes,
  date,
  setSelectedTime,
  selectedTime,
}: IAppointmentPicker) {
  const times = [];
  for (let i = 0; i < availableTimes.length; i++) {
    const currItem = availableTimes[i];
    times.push(
      <div
        className={
          selectedTime === currItem.id ? "time-slot selected-time" : "time-slot"
        }
        key={i}
        onClick={() => setSelectedTime(currItem.id)}
      >
        {currItem.appointmentTime(" - ")}
      </div>
    );
  }

  const [inputValidation, setInputValidation] = useState({
    name: "",
    email: "",
    phone: "",
    error: false,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const submit = () => {
    if (inputValidation.error) {
      return;
    }
  };

  useOnInitialized(() => {
    setInputValidation({ name: "", email: "", phone: "", error: false });
  }, [])

  const dateFormat = "eee dd MMM yyyy";
  const titleMessage =
    selectedTime === ""
      ? format(date, dateFormat)
      : `${format(date, dateFormat)} - ${availableTimes.find(t => t.id === selectedTime)?.appointmentTime(" to ")}`;
  return (
    <div className="w-100">
      <header className="booker-header">
        <p className="text-center title">{titleMessage}</p>
        <br />
        <p className="text-left pad-left-18 title">Select a time:</p>
      </header>
      <div className="appointment-booker">
        <div className="available-times">{times}</div>
        <div className="appointment-form">
          <ContactForm
            inputValidation={inputValidation}
            setInputValidation={setInputValidation}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
          />
          <button className="btn cancel-btn" onClick={() => closeModal()}>
            Cancel
          </button>
          <button className="btn float-right" onClick={() => submit()}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
