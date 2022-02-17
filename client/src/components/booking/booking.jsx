import React, { useState, useEffect } from "react";
import Axios from "axios";

import Calendar from "./calendar";
import Modal from "../shared/modal";
import AppointmentPicker from "./appointment-picker";
import "./booking.css";

export default function Booking() {
  const [showModal, setShowModal] = useState(false);
  const [availableTimes, setAvailableTimes] = useState("");
  const [selectedDate, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const openModal = () => setShowModal(true);

  const updateDate = (date) => {
    setDate(date);
    openModal();
  };

  const updateTime = (time) => {
    setSelectedTime(time);
  }

  const closeModal = () => {
    setSelectedTime("");
    setShowModal(false);
  }

  const setModal = (isActive) => {
    if (!isActive) {
      setSelectedTime("");
    }
    setShowModal(isActive);
  } 

  useEffect(() => {
    Axios.get("http://localhost:3001/api/appointments").then((res) => {
      setAvailableTimes(res.data.times);
    });
  }, []);

  return (
    <div className="booking-content">
      <div>
        {showModal ? (
          <Modal setShowModal={setModal}>
            <AppointmentPicker
              closeModal={closeModal}
              date={selectedDate}
              availableTimes={availableTimes}
              setSelectedTime={updateTime}
              selectedTime={selectedTime}
            />
          </Modal>
        ) : null}
      </div>
      <div className="calendar-wrapper">
        <Calendar handleSelectedDate={(date) => updateDate(date)} />
      </div>
    </div>
  );
}
