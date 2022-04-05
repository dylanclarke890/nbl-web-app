import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";

import { LoadingContext } from "../../contexts/loading-context/loading-context";
import { ToastContext } from "../../contexts/toast-context/toast-context";

import { getAppointmentsByDay } from "../../services/appointmentService";
import Appointment from "../../models/appointment";
import Treatment from "../../models/treatment";

import Calendar from "./calendar/calendar";
import Modal from "../shared/modal/modal";
import AppointmentPicker from "./appointment/appointment-picker/appointment-picker";
import AppointmentConfirmation from "./appointment/appointment-confirmation/appointment-confirmation";

import "./booking.css";
import TitleAndDesc from "../shared/title-and-desc/title-and-desc";

export default function Booking() {
  const { treatmentId } = useParams();
  const { loading, isLoading, loaded } = useContext(LoadingContext);
  const { createToast } = useContext(ToastContext);

  const [availableTimes, setAvailableTimes] = useState(new Array<Appointment>());
  const [treatment, setTreatment] = useState(new Treatment("", "", 0, 0, false));
  const [showModal, setShowModal] = useState(false);
  // set the initial date to yesterday to avoid an unnecessary api call. 86400000 = 1 day in milliseconds.
  const [selectedDate, setDate] = useState(new Date(new Date().valueOf() - 86400000));
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

  /* eslint-disable */
  const onError = useCallback(() => createToast("Error", "Error while loading appointments."), []);
  useEffect(() => {
    if (!treatmentId || loading || selectedDate.valueOf() < new Date().valueOf()) return;
    const fetchData = async () => {
      isLoading();
      const data = await getAppointmentsByDay(selectedDate, treatmentId);
      setAvailableTimes(data[0]);
      setTreatment(data[1]);
      loaded();
    }
    fetchData().catch(() => { onError(); loaded(); });
  }, [treatmentId, selectedDate]);
  /* eslint-enable */

  const [modalSlide, setModalSlide] = useState(0);
  const [successInfo, setSuccessInfo] = useState({ message: "", reference: "", time: "" });
  const changeSlide = (res: any) => {
    setSuccessInfo(res);
    setModalSlide(1);
  }

  return (
    <>
      <TitleAndDesc title="Make a booking" desc="Book your treatment today!" />
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
                  onError={onError}
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
    </>
  );
}
