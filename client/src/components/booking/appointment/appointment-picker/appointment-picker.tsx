import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";

import IAppointmentPicker from "./IAppointmentPicker";
import ContactForm from "../../../shared/forms/contact-form/contact-form";
import TimesUnavailable from '../times-unavailable/times-unavailable';

import useOnInitialized from "../../../../custom-hooks/useOnInitialized";
import { addAppointment } from "../../../../services/appointmentService";

import "./appointment-picker.css";
import { LoadingContext } from "../../../../contexts/loading-context/loading-context";
import { ToastContext } from "../../../../contexts/toast-context/toast-context";

export default function AppointmentPicker({
  closeModal,
  availableTimes,
  date,
  setSelectedTime,
  selectedTime,
  treatment,
  onSuccessfulSubmit
}: IAppointmentPicker) {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

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

  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const updateReadyToSubmit = () => {
    setReadyToSubmit(true);
    checkForEmptyInputs();
    checkTimeIsSelected();
  }

  const onError = () => createToast("error", "Error while saving appointment.");
  /* eslint-disable */
  useEffect(() => {
    if (!readyToSubmit) return;
    if (inputValidation.error) {
      setReadyToSubmit(false);
      return;
    }
    submit()
      .catch(() => { onError(); loaded(); setReadyToSubmit(false); });
    setReadyToSubmit(false);
  }, [readyToSubmit]);
  /* eslint-enable */

  const submit = async () => {
    if (loading) return;
    isLoading();

    if (inputValidation.error || showTimeError) {
      setReadyToSubmit(false);
      return;
    }
    const time = availableTimes.find(ti => ti.id === selectedTime);
    if (!time) {
      setReadyToSubmit(false);
      loaded();
      return;
    }

    await addAppointment(time!, { name, email, phone }, date, treatment, onSuccessfulSubmit, true);
    loaded();
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
  return !availableTimes.length && !loading ?
    <TimesUnavailable titleMessage={titleMessage} closeModal={closeModal} /> :
    (
      <>
        <div className="w-100">
          <header className="booker-header">
            <h1 className="text-center title">{titleMessage}</h1>
            <h2 className={`select-time-header sub-title ${showTimeError ? "text-error" : ""}`}>Select a time:</h2>
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
              <button className="btn float-right" onClick={() => updateReadyToSubmit()}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </>
    );
}
