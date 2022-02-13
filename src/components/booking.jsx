import React, {useState} from "react";
import Calendar from "./calendar";
import Modal from "./modal";

function Booking() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);

  return (
    <div>
      <div>
        <h1>Popup Modal</h1>
        <button onClick={openModal}>Open Modal</button>
        {showModal ? <Modal setShowModal={setShowModal} /> : null}
      </div>
      <Calendar />
    </div>
  );
}

export default Booking;
