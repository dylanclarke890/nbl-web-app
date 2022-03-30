import React, { useCallback, useContext, useEffect, useState } from "react";

import { addSchedule } from "../../../services/scheduleService";
import Schedule from "../../../models/schedule";

import ScheduleForm from "../../shared/forms/schedule-form/schedule-form";
import Header from "../../shared/header/header";
import { ToastContext } from "../../../contexts/toast-context/toast-context";

export default function NewSchedule() {
  const { createToast } = useContext(ToastContext);

  const [schedule, setSchedule] = useState(new Schedule("", "", new Date(), [], false));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (schedule: Schedule) => {
    setReadyToSubmit(true);
    setSchedule(schedule);
  }

  // eslint-disable
  const onError = useCallback(() => createToast("errror", "Error while saving"), []);
  useEffect(() => {
    if (!readyToSubmit) return;

    const sendData = async () => {
      await addSchedule(schedule);
      setCurrSlide(1);
    }
    sendData().catch(onError);
  }, [schedule, readyToSubmit]);
  // eslint-enable

  return currSlide === 0 ? (
    <>
      <Header headerTitle="New" returnLinkUrl={'../admin/schedules'} linkText={'Back to all'} />
      <ScheduleForm onSubmit={handleSubmit} />
    </>
  ) : (
    <>
      <Header headerTitle="Success!" returnLinkUrl={'../admin/schedules'} linkText={'Back to all'} />
    </>
  )
}