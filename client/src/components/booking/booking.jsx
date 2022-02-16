import React, { useState, useEffect } from "react";
import Axios from 'axios';

import Calendar from "./calendar";
import Modal from "../shared/modal";
import AppointmentPicker from "./appointment-picker";
import './booking.css';

export default function Booking() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState("");

  const openModal = () => setShowModal(true);

  const updateDate = (date) => {
    setDate(date);
    openModal();
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/api/appointments").then(res => {
    setAvailableTimes(res.data.times);
    console.log(res.data.times);
  })}, []);

  return (
    <div className="booking-content">
      <div>
        {showModal ? (
          <Modal setShowModal={setShowModal}>
            <AppointmentPicker setShowModal={setShowModal} date={selectedDate} availableTimes={availableTimes} />
          </Modal>
        ) : null}
      </div>
      <div className="calendar-wrapper">
        <Calendar handleSelectedDate={date => updateDate(date)}/>
      </div>
    </div>
  );
}