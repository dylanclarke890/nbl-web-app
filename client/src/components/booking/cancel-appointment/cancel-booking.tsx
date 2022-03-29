import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { cancelAppointment, getAppointment } from "../../../services/appointmentService";
import Appointment from "../../../models/appointment";

import CustomInput from "../../shared/input/custom-input/custom-input";
import Modal from "../../shared/modal/modal";
import CheckmarkSvg from "../../shared/svgs/checkmark-svg";

import './cancel-booking.css';

export default function CancelBooking() {
  const { createToast } = useContext(ToastContext);

  const [currSlide, setCurrSlide] = useState(0);
  const [reference, setReference] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [appointment, setAppointment] = useState(new Appointment("", "", ""));

  const handleClick = () => {
    if (reference === "" || reference.length <= 8) {
      setError("Need a valid reference.");
      return;
    }
    fetchAppointment(reference);
  }

  const onError = () => createToast("Error", "Unexpected error, please try again.");
  const fetchAppointment = async (id: string) => {
    const data = await getAppointment(id).catch(onError);

    if (data?.person?.name == null) {
      onError();
      setError("Need a valid reference.")
      return;
    }

    setError("");
    setShowModal(true);
    setAppointment(data);
  }
  const confirmCancellation = () => {
    setShowModal(false);
    if (appointment.id === "") return;
    cancelApp(appointment.id);
  }

  const cancelApp = async (id: string) => {
    try {
      const res = await cancelAppointment(id);
      if (res) setCurrSlide(1);
    } catch {
      onError();
    }
  }

  return currSlide === 0 ? (
    <>
      {showModal ?
        <Modal setShowModal={setShowModal} >
          <div className="confirmation-modal-content">
            <p className="title text-center">{appointment?.person?.name}</p>
            <p className="title text-center">Are you sure you want to cancel your appointment?</p>
            <div className="text-center">
              <p className="title">{appointment?.date?.toDateString()}</p>
              <p className="sub-title">between</p>
              <p className="title">{appointment?.appointmentTime(" and ")}</p>
            </div>
            <div className="modal-content-btns">
              <button className="btn cancel-btn" onClick={() => setShowModal(false)}>No, not yet.</button>
              <button className="btn" onClick={confirmCancellation}>Yes, cancel my appointment.</button>
            </div>
          </div>
        </Modal> : null}
      <p className="title text-center">Please enter your booking reference:</p>
      <div className="cancel-booking-wrapper">
        <CustomInput
          inputId="reference"
          active={reference !== ""}
          error={error}
          onChange={setReference} />
        <button className="btn mt-1" onClick={handleClick}>Next</button>
      </div>
    </>
  ) :
    <>
      <div className="flex flex-column col-center mt-2">
        <CheckmarkSvg />
        <p className="title">Your appointment has been successfully cancelled. Hope to see you again soon!</p>
        <div>
          <Link className="btn mt-1" to={'/'}>Back to home</Link>
        </div>
      </div>
    </>
}