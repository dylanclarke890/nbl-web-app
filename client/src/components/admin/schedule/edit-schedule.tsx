import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { editSchedule } from "../../../services/scheduleService";
import Schedule from "../../../models/schedule";

import ScheduleForm from "../../shared/forms/schedule-form/schedule-form";
import Header from "../../shared/header/header";
import { ToastContext } from "../../../contexts/toast-context/toast-context";

export default function EditSchedule() {
  const { id } = useParams();
  const { createToast } = useContext(ToastContext);

  const [schedule, setSchedule] = useState(new Schedule("", "", new Date(), [], false));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (schedule: Schedule) => {
    setSchedule({ ...schedule, _id: id! });
    setReadyToSubmit(true);
  }

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while saving schedule."), []);
  useEffect(() => {
    if (!readyToSubmit) return;
    const sendData = async () => {
      const res = await editSchedule(schedule);
      if (res) setCurrSlide(1);
    }
    sendData().catch(onError);
  }, [schedule, readyToSubmit]);
  /* eslint-enable */

  return currSlide === 0 ? (
    <>
      <Header headerTitle={`Edit`} returnLinkUrl={'../admin/schedules'} linkText={'Back to all'} />
      <ScheduleForm id={id} onSubmit={handleSubmit} />
    </>
  ) : (
    <>
      <Header headerTitle="Success!" returnLinkUrl={'../admin/schedules'} linkText={'Back to all'} />
    </>
  )
}