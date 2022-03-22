import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { getAppointmentsByDay } from "../../services/appointmentService";
import Appointment from "../../models/appointment";
import Treatment from "../../models/treatment";
import IToast from "../shared/toast/IToast";

import createToast from "../shared/toast/toast-helper";
import Toast from "../shared/toast/toast";
import Calendar from "./calendar/calendar";
import Modal from "../shared/modal/modal";
import AppointmentPicker from "./appointment/appointment-picker/appointment-picker";
import AppointmentConfirmation from "./appointment/appointment-confirmation/appointment-confirmation";

import "./booking.css";
import { LoadingContext } from "../../contexts/loading-context/loading-context";

export default function Booking() {
  const { treatmentId } = useParams();
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  const [availableTimes, setAvailableTimes] = useState(new Array<Appointment>());
  const [treatment, setTreatment] = useState(new Treatment("", "", 0, 0, false));
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const updateDate = (date: Date) => {
    openModal();
    setDate(date);
  };

  const openModal = () => setShowModal(true);
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
    if (treatmentId === "") return;
    isLoading();
    const fetchData = async () => {
      const data = await getAppointmentsByDay(selectedDate, treatmentId!, createErrorToast);
      setAvailableTimes(data[0]);
      setTreatment(data[1]);
    }
    fetchData().catch(console.error);
    loaded();
  }, [selectedDate, treatmentId, isLoading, loaded]);

  const [modalSlide, setModalSlide] = useState(0);
  const [successInfo, setSuccessInfo] = useState({ message: "", reference: "", time: "" });
  const changeSlide = (res: any) => {
    setSuccessInfo(res);
    setModalSlide(1);
  }

  return (
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
                  setSelectedTime={setSelectedTime}
                  selectedTime={selectedTime}
                  treatment={treatment}
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
