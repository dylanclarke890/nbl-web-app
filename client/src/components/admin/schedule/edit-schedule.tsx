import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { editSchedule } from "../../../services/scheduleService";
import Schedule from "../../../models/schedule";

import ScheduleForm from "../../shared/forms/schedule-form/schedule-form";
import Header from "../../shared/header/header";

export default function EditSchedule() {
  const { id } = useParams();

  const [schedule, setSchedule] = useState(new Schedule("", "", new Date(), []));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (schedule: Schedule) => {
    setSchedule({ ...schedule, _id: id! });
    setReadyToSubmit(true);
  }

  useEffect(() => {
    if (!readyToSubmit) return;
    const sendData = async () => {
      const res = await editSchedule(schedule, console.error);
      if (res) {
        setCurrSlide(1)
      } else {
        alert("Failed");
      };
    }
    sendData().catch(console.error);
  }, [schedule, readyToSubmit]);

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