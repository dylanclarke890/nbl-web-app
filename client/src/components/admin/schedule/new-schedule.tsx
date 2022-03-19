import React, { useEffect, useState } from "react";

import { addSchedule } from "../../../services/scheduleService";
import Schedule from "../../../models/schedule";

import ScheduleForm from "../../shared/forms/schedule-form/schedule-form";
import Header from "../../shared/header/header";

export default function NewSchedule() {
  const [schedule, setSchedule] = useState(new Schedule("", "", new Date(), [], false));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (schedule: Schedule) => {
    setReadyToSubmit(true);
    setSchedule(schedule);
  }

  useEffect(() => {
    if (!readyToSubmit) return;

    const sendData = async () => {
      await addSchedule(schedule, console.error);
      setCurrSlide(1);
    }
    sendData().catch(console.error);
  }, [schedule, readyToSubmit]);

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