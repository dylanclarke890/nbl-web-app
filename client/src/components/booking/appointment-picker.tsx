import React, { useState } from "react";

import { format } from "date-fns";
import "./appointment-picker.css";
import ContactForm from "../shared/input/contact-form";
import { useEffect } from "react";
import { useRef } from "react";

interface IAppointmentPicker {
  closeModal: any,
  availableTimes: any,
  date: Date,
  setSelectedTime: any,
  selectedTime: string
}

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
    const content = `${currItem.from} - ${currItem.to}`;
    times.push(
      <div
        className={
          selectedTime === currItem.id ? "time-slot selected-time" : "time-slot"
        }
        key={i}
        onClick={() => setSelectedTime(currItem.id)}
      >
        {content}
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

  const firstRender = useRef(true);
  useEffect(() => {
    if (!firstRender.current) {
      return;
    }
    setInputValidation({ name: "", email: "", phone: "", error: false });
    firstRender.current = false;
  }, [])

  const dateFormat = "eee dd MMM yyyy";
  const titleMessage =
    selectedTime === ""
      ? format(date, dateFormat)
      : `${format(date, dateFormat)} - ${selectedTime}`;
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
          <br />
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
