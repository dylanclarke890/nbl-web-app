import React, { useState } from "react";
import Calendar from "./calendar";
import Modal from "./modal";
import AppointmentBooker from "./appointmentBooker";
import '../styles/booking.css';

export default function Booking() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);

  const [selectedDate, setDate] = useState(new Date());
  const updateDate = (date) => {
    setDate(date);
    openModal();
  }

  return (
    <div className="booking-content">
      <div>
        {showModal ? (
          <Modal setShowModal={setShowModal}>
            <AppointmentBooker setShowModal={setShowModal} date={selectedDate} availableTimes={["2:30 - 3:30", "3:30 - 4:30", "4:30 - 5:30"]} />
          </Modal>
        ) : null}
      </div>
      <Calendar handleSelectedDate={date => updateDate(date)}/>
    </div>
  );
}