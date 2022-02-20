import React, { useRef } from "react";
import ReactDom from "react-dom";
import './modal.css'

interface IModal {
  setShowModal: any,
  children: any
}

export default function Modal({ setShowModal, children } : IModal) {
  // close the modal when clicking outside the modal.
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = (e : any) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        {children}
        <button className="modal-button" onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")!
  );
}