import React, { useState, useEffect } from "react";
import Axios from "axios";

import Calendar from "./calendar";
import Modal from "../shared/modal";
import AppointmentPicker from "./appointment-picker";
import "./booking.css";
import Appointment from "../../models/appointment";
import AppointmentConfirmation from "./appointment-confirmation";
import { sortByTimeStamp } from "../../helpers/timeSort";
import IToast from "../../interfaces/IToast";
import createToast from "../shared/toast/toast-helper";
import Toast from "../shared/toast/toast";

export default function Booking() {
  const [showModal, setShowModal] = useState(false);
  const [availableTimes, setAvailableTimes] = useState(new Array<Appointment>());
  const [selectedDate, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

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

  const [toastList, setToastList]= useState(new Array<IToast>());
  const createErrorToast = () => {
    setToastList(t => [...t, createToast("Error", "Unexpected error, please try again.")]);
  }

  useEffect(() => {
    if (!selectedDate) return;
    Axios.get(`/api/appointments/${selectedDate.getDate()}/${selectedDate.getMonth()}/${selectedDate.getFullYear()}`)
      .then((res) => {
        let times: Appointment[] = [];
        res.data.times.forEach((el: { day: Date; from: string; to: string; }) => times.push(new Appointment(res.data.times.indexOf(el), el.from, el.to)));
        setAvailableTimes(sortByTimeStamp(times));
      })
      .catch(err => createErrorToast());;
  }, [selectedDate]);

  const [currSlide, setCurrSlide] = useState(0);
  const [successInfo, setSuccessInfo] = useState({ message: "", reference: "", time: "" });
  const changeSlide = (res: any) => {
    setSuccessInfo(res);
    setCurrSlide(1);
  }

  return (
    <>
      <div className="booking-content">
        <div>
          {showModal ? (
            <Modal setShowModal={setModal}>
              {currSlide === 0 ? (
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
          <Calendar handleSelectedDate={updateDate} />
        </div>
      </div>
      <Toast autoDelete={true} autoDeleteTime={2000} toastList={toastList} setToastList={setToastList} position={'top-right'} />
    </>
  );
}
