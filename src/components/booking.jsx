import React, { useState } from "react";
import Calendar from "./calendar";
import Modal from "./modal";
import AppointmentBooker from "./appointmentBooker";

function Booking() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);

  return (
    <div>
      <div>
        <h1>Popup Modal</h1>
        <button onClick={openModal}>Open Modal</button>
        {showModal ? (
          <Modal setShowModal={setShowModal}>
            <AppointmentBooker date={new Date()} availableTimes={["2:30 - 3:30", "3:30 - 4:30", "4:30 - 5:30"]} />
          </Modal>
        ) : null}
      </div>
      <Calendar />
    </div>
  );
}

export default Booking;
