import React, { useState, useEffect } from "react";

import { getAppointmentsByDay } from "../../services/appointmentService";
import Calendar from "./calendar";
import Modal from "../shared/modal/modal";
import AppointmentPicker from "./appointment-picker";
import "./booking.css";
import Appointment from "../../models/appointment";
import AppointmentConfirmation from "./appointment-confirmation";
import IToast from "../../interfaces/IToast";
import createToast from "../shared/toast/toast-helper";
import Toast from "../shared/toast/toast";

export default function Booking() {
  const [stageSlide, setStageSlide] = useState(0);
  const [appointmentType, setAppointmentType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [availableTimes, setAvailableTimes] = useState(new Array<Appointment>());
  const [selectedDate, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const selectAppointmentType = (type:string) => {
    setAppointmentType(type);
    setStageSlide(1);
  }


  const openModal = () => setShowModal(true);

  const updateDate = (date: Date) => {
    openModal();
    setDate(date);
  };

  const updateTime = (time: string) => {
    setSelectedTime(time);
  }

  const closeModal = () => {
    setSelectedTime("");
    setShowModal(false);
  }

  const setModal = (isActive: boolean) => {
    if (!isActive) {
      setSelectedTime("");
    }
    setShowModal(isActive);
  }

  const [toastList, setToastList] = useState(new Array<IToast>());
  const createErrorToast = () => {
    setToastList(t => [...t, createToast("Error", "Unexpected error, please try again.")]);
  }

  useEffect(() => {
    if (stageSlide === 0) return;
    const fetchData = async () => {
      const data = await getAppointmentsByDay(selectedDate, createErrorToast);
      setAvailableTimes(data);
    }
    fetchData().catch(console.error);
  }, [selectedDate, stageSlide]);

  const [modalSlide, setModalSlide] = useState(0);
  const [successInfo, setSuccessInfo] = useState({ message: "", reference: "", time: "" });
  const changeSlide = (res: any) => {
    setSuccessInfo(res);
    setModalSlide(1);
  }

  return stageSlide === 0 ? 
  (<>
  <div className="appointment-type-selector title text-center ">
    <div className="mt-1 mb-1 fade-in">Please select the type of appointment you would like:</div>
    <div className="appointment-type-options mt-1">
      <button className="btn fade-in delay-200" onClick={() => selectAppointmentType("Nails")}>Nails</button>
      <button className="btn fade-in delay-400" onClick={() => selectAppointmentType("Brows")}>Brows</button>
      <button className="btn fade-in delay-600" onClick={() => selectAppointmentType("Lashes")}>Lashes</button>
    </div>
  </div>
  </>) : (
    <>
      <div className="booking-content">
        <div>
          {showModal ? (
            <Modal setShowModal={setModal}>
              {modalSlide === 0 ? (
                <AppointmentPicker
                  closeModal={closeModal}
                  date={selectedDate}
                  availableTimes={availableTimes}
                  setSelectedTime={updateTime}
                  selectedTime={selectedTime}
                  onError={createErrorToast}
                  onSuccessfulSubmit={changeSlide}
                />
              ) : (
                <AppointmentConfirmation reference={successInfo.reference}
                  date={selectedDate} time={successInfo.time} />
              )}
            </Modal>
          ) : null}
        </div>
        <div className="calendar-wrapper">
          <p className="text-center mt-1 fade-in">Showing availability for: {appointmentType}</p>
          <Calendar handleSelectedDate={updateDate} />
        </div>
      </div>
      <Toast autoDelete={true} autoDeleteTime={2000} toastList={toastList} setToastList={setToastList} position={'top-right'} />
    </>
  );
}
