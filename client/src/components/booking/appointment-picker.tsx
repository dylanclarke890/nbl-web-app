import React, { useState } from "react";

import { format } from "date-fns";
import "./appointment-picker.css";
import ContactForm from "../shared/input/contact-form";
import useOnInitialized from "../../custom-hooks/onInitialized";
import IAppointmentPicker from "../../interfaces/IAppointmentPicker";
import axios from "axios";

export default function AppointmentPicker({
  closeModal,
  availableTimes,
  date,
  setSelectedTime,
  selectedTime,
  onSuccessfulSubmit
}: IAppointmentPicker) {
  const times = [];
  for (let i = 0; i < availableTimes.length; i++) {
    const currItem = availableTimes[i];
    times.push(
      <div
        className={
          selectedTime === currItem.id ? "time-slot selected-time" : "time-slot"
        }
        key={currItem.id}
        onClick={() => setSelectedTime(currItem.id)}
      >
        {currItem.appointmentTime(" - ")}
      </div>
    );
  }

  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const groups = [];
  for (let i = 0; i < times.length / 3; i++) {
    groups.push(times.slice(i, i + 3));
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

  const checkForEmptyInputs = () => {
    if (!name) {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        name: "Must provide a name.",
        error: true
      }))
    }
    if (!email) {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        email: "Must provide an email address.",
        error: true
      }))
    }
    if (!phone) {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        phone: "Must provide a number.",
        error: true
      }))
    }
  }

  const submit = () => {
    checkForEmptyInputs();

    if (inputValidation.error || selectedTime === "") {
      return;
    }

    axios.post("http://localhost:3001/api/appointments/new",
      { id: selectedTime, name: name, email: email, phone: phone })
      .then(res => {
        const successInfo = {
          message: res.data.message,
          reference: res.data.reference,
          time: availableTimes.find(i => i.id === selectedTime)?.appointmentTime(" - ")
        };
        onSuccessfulSubmit(successInfo);
      });
  };

  useOnInitialized(() => {
    setInputValidation({ name: "", email: "", phone: "", error: false });
  }, [])

  const updateSelectedGroup = (addition: Boolean) => {
    if (addition) {
      if (selectedGroupIndex + 1 >= groups.length) {
        setSelectedGroupIndex(0);
      } else {
        setSelectedGroupIndex(curr => curr + 1);
      }
    } else {
      if (selectedGroupIndex - 1 < 0) {
        setSelectedGroupIndex(groups.length - 1);
      } else {
        setSelectedGroupIndex(curr => curr - 1);
      }
    }
  }

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
        <div>
          <div className="available-times">{groups[selectedGroupIndex]}</div>
          <div className="times-action-buttons">
            <button className="btn" onClick={() => updateSelectedGroup(false)}>Prev</button>
            <button className="btn" onClick={() => updateSelectedGroup(true)}>Next</button>
          </div>
        </div>
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
