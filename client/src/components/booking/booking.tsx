import React, { useState, useEffect } from "react";
import Axios from "axios";

import Calendar from "./calendar";
import Modal from "../shared/modal";
import AppointmentPicker from "./appointment-picker";
import "./booking.css";
import Appointment from "../../models/appointment";
import AppointmentConfirmation from "./appointment-confirmation";

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

  useEffect(() => {
    if (!selectedDate) return;
    Axios.get(`http://localhost:3001/api/appointments/${selectedDate.getDate()}/${selectedDate.getMonth()}/${selectedDate.getFullYear()}`)
      .then((res) => {
        let times: Appointment[] = [];
        res.data.times.forEach((el: { id: string; day: Date; from: string; to: string; }) => times.push(new Appointment(el.id, el.from, el.to)));
        setAvailableTimes(times);
      });
  }, [selectedDate]);

  const [currSlide, setCurrSlide] = useState(0);
  const [successInfo, setSuccessInfo] = useState({ message: "", reference: "", time: "" });
  const changeSlide = (res: any) => {
    setSuccessInfo(res);
    setCurrSlide(1);
  }

  return (
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
  );
}
