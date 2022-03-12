import React, { useState } from "react";

import { format } from "date-fns";

import ContactForm from "../../shared/forms/contact-form";
import TimesUnavailable from './times-unavailable';

import IAppointmentPicker from "../../../interfaces/IAppointmentPicker";
import useOnInitialized from "../../../custom-hooks/useOnInitialized";
import { addAppointment } from "../../../services/appointmentService";

import "./appointment-picker.css";

export default function AppointmentPicker({
  closeModal,
  availableTimes,
  date,
  setSelectedTime,
  selectedTime,
  onError,
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

  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const groups = [];
  for (let i = 0; i < times.length; i += 3) {
    const slice = times.slice(i, i + 3);
    groups.push(slice);
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

  const [showTimeError, setShowTimeError] = useState(false);
  const checkTimeIsSelected = () => {
    setShowTimeError(selectedTime === "");
  }

  const submit = async () => {
    checkForEmptyInputs();
    checkTimeIsSelected();
    if (inputValidation.error || showTimeError) {
      return;
    }

    const time = availableTimes.find(ti => ti.id === selectedTime);
    if (!time) {
      onError();
    }
    await addAppointment(time!, { name, email, phone }, date, onSuccessfulSubmit, onError);
  };

  useOnInitialized(() => {
    setInputValidation({ name: "", email: "", phone: "", error: false });
  }, [])

  const updateSelectedGroup = (addition: Boolean) => {
    if (addition) {
      if (currentGroupIndex + 1 >= groups.length) {
        setCurrentGroupIndex(0);
      } else {
        setCurrentGroupIndex(curr => curr + 1);
      }
    } else {
      if (currentGroupIndex - 1 < 0) {
        setCurrentGroupIndex(groups.length - 1);
      } else {
        setCurrentGroupIndex(curr => curr - 1);
      }
    }
  }

  const dateFormat = "eee dd MMM yyyy";
  const titleMessage =
    selectedTime === ""
      ? format(date, dateFormat)
      : `${format(date, dateFormat)} - ${availableTimes.find(t => t.id === selectedTime)?.appointmentTime(" to ")}`;
  return !availableTimes.length ?
    <TimesUnavailable titleMessage={titleMessage} closeModal={closeModal}  /> :
    (
      <>
        <div className="w-100">
          <header className="booker-header">
            <p className="text-center title">{titleMessage}</p>
            <p className={`text-left pad-left-18 title ${showTimeError ? "text-error" : null}`}>Select a time:</p>
          </header>
          <div className="appointment-booker">
            <div>
              <div className="available-times">{groups[currentGroupIndex]}</div>
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
      </>
    );
}
