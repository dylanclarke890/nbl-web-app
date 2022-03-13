import React, { useState, useEffect, useCallback } from "react";

import { getAllAppointmentTypes } from "../../services/appointmentTypeService";
import { getAppointmentsByDay } from "../../services/appointmentService";
import AppointmentType from "../../models/appointment-type";
import Appointment from "../../models/appointment";
import IToast from "../../interfaces/IToast";

import Toast from "../shared/toast/toast";
import createToast from "../shared/toast/toast-helper";
import Calendar from "./calendar/calendar";
import Modal from "../shared/modal/modal";
import AppointmentPicker from "./appointment/appointment-picker";
import AppointmentConfirmation from "./appointment/appointment-confirmation";
import { AppointmentTypeItem } from './appointment-type/appointment-type-item';
import { AppointmentTypeSelector } from './appointment-type/appointment-type-selector';

import "./booking.css";

export default function Booking() {
  const [stageSlide, setStageSlide] = useState(0);
  const [appointmentType, setAppointmentType] = useState(new AppointmentType("", "", 0, 0, false));
  const [appointmentTypeItems, setAppointmentTypeItems] = useState<JSX.Element[]>([]);
  const [availableTimes, setAvailableTimes] = useState(new Array<Appointment>());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const selectAppointmentType = (type: AppointmentType) => {
    setAppointmentType(type);
    setStageSlide(1);
  }
  const openModal = () => setShowModal(true);

  const updateDate = (date: Date) => {
    openModal();
    setDate(date);
  };

  const updateAppointmentTypeSelection = useCallback((appointmentTypes: AppointmentType[]) => {
    const appointmentTypeItems: JSX.Element[] = [];
    for (let i = 0; i < appointmentTypes.length; i++) {
      const el = appointmentTypes[i];
      appointmentTypeItems.push((
        <AppointmentTypeItem key={el._id} delay={i * 200} selectAppointmentType={selectAppointmentType} item={el} />
      ));
    }
    setAppointmentTypeItems([...appointmentTypeItems]);
  }, [])

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

  const [toastList, setToastList] = useState(new Array<IToast>());
  const createErrorToast = () => {
    setToastList(t => [...t, createToast("Error", "Unexpected error, please try again.")]);
  }

  useEffect(() => {
    if (appointmentType?._id !== "") return;
    const fetchData = async () => {
      await getAllAppointmentTypes(updateAppointmentTypeSelection, createErrorToast);
    }
    fetchData().catch(console.error);
  }, [appointmentType, updateAppointmentTypeSelection]);

  useEffect(() => {
    if (stageSlide === 0 || appointmentType?._id === "") return;
    const fetchData = async () => {
      const data = await getAppointmentsByDay(selectedDate, appointmentType._id, createErrorToast);
      setAvailableTimes(data);
    }
    fetchData().catch(console.error);
  }, [selectedDate, stageSlide, appointmentType?._id]);

  const [modalSlide, setModalSlide] = useState(0);
  const [successInfo, setSuccessInfo] = useState({ message: "", reference: "", time: "" });
  const changeSlide = (res: any) => {
    setSuccessInfo(res);
    setModalSlide(1);
  }

  return stageSlide === 0 ?
    <AppointmentTypeSelector appointmentTypeButtons={appointmentTypeItems} /> : (
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
                    setSelectedTime={updateTime}
                    selectedTime={selectedTime}
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
            <p className="text-center mt-1 fade-in">Showing availability for: {appointmentType.appointmentType}</p>
            <Calendar handleSelectedDate={updateDate} />
          </div>
        </div>
        <Toast autoDelete={true} autoDeleteTime={2000} toastList={toastList} setToastList={setToastList} position={'top-right'} />
      </>
    );
}
