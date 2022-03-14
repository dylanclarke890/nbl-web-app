import React, { useCallback, useEffect, useState } from "react";

import { getAllAppointmentTypes } from "../../../services/appointmentTypeService";

import IToast from "../../../interfaces/IToast";
import Toast from "../../shared/toast/toast";
import createToast from "../../shared/toast/toast-helper";
import AppointmentTypeItem from "../appointment-type/appointment-type-item";
import AppointmentTypeSelector from "../appointment-type/appointment-type-selector";
import AppointmentType from "../../../models/appointment-type";
import CancellationOption from "../cancel-appointment/cancellation-option";

export default function BookingOptions() {
  const [appointmentTypeItems, setAppointmentTypeItems] = useState<JSX.Element[]>([]);

  const updateAppointmentTypeSelection = useCallback((appointmentTypes: AppointmentType[]) => {
    const appointmentTypeItems: JSX.Element[] = [];
    for (let i = 0; i < appointmentTypes.length; i++) {
      const el = appointmentTypes[i];
      appointmentTypeItems.push((
        <AppointmentTypeItem key={el._id} delay={i * 200} item={el} />
      ));
    }
    setAppointmentTypeItems([...appointmentTypeItems]);
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await getAllAppointmentTypes(updateAppointmentTypeSelection, createErrorToast);
    }
    fetchData().catch(console.error);
  }, [updateAppointmentTypeSelection]);

  const [toastList, setToastList] = useState(new Array<IToast>());
  const createErrorToast = () => {
    setToastList(t => [...t, createToast("Error", "Unexpected error.")]);
  }

  return (
    <>
      <AppointmentTypeSelector appointmentTypeButtons={appointmentTypeItems} />
      <p className="sub-title text-center mt-2">Or</p>
      <CancellationOption />
      <Toast autoDelete={true} autoDeleteTime={2000} toastList={toastList} setToastList={setToastList} position={'top-right'} />
    </>
  )
}