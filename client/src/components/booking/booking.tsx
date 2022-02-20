import React, { useState, useEffect } from "react";
import Axios from "axios";

import Calendar from "./calendar";
import Modal from "../shared/modal";
import AppointmentPicker from "./appointment-picker";
import "./booking.css";
import Appointment from "../../models/appointment";

export default function Booking() {
  const [showModal, setShowModal] = useState(false);
  const [availableTimes, setAvailableTimes] = useState(new Array<Appointment>());
  const [selectedDate, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const openModal = () => setShowModal(true);

  const updateDate = (date: Date) => {
    setDate(date);
    openModal();
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
    Axios.get("http://localhost:3001/api/appointments").then((res) => {
      let times: Appointment[] = [];
      res.data.times.forEach((el: { id: string; day: Date; from: string; to: string; }) => times.push(new Appointment(el.id, el.from, el.to)));
      setAvailableTimes(times);
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
        <Calendar handleSelectedDate={(date: Date) => updateDate(date)} />
      </div>
    </div>
  );
}
