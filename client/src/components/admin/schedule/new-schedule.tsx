import React, { useCallback, useContext, useEffect, useState } from "react";

import { addSchedule } from "../../../services/scheduleService";
import Schedule from "../../../models/schedule";

import ScheduleForm from "../../shared/forms/schedule-form/schedule-form";
import Header from "../../shared/header/header";
import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { LoadingContext } from "../../../contexts/loading-context/loading-context";
import TitleAndDesc from "../../shared/title-and-desc/title-and-desc";

export default function NewSchedule() {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  const [schedule, setSchedule] = useState(new Schedule("", "", new Date(), [], false));
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currSlide, setCurrSlide] = useState(0);

  const handleSubmit = (schedule: Schedule) => {
    setReadyToSubmit(true);
    setSchedule(schedule);
  }

  /* eslint-disable */
  const onError = useCallback(() => createToast("errror", "Error while saving schedule."), []);
  useEffect(() => {
    if (!readyToSubmit || loading) return;
    const sendData = async () => {
      isLoading();
      await addSchedule(schedule);
      setCurrSlide(1);
      loaded();
    }
    sendData().catch(() => { onError(); loaded(); });;
  }, [schedule, readyToSubmit]);
  /* eslint-enable */

  const titleAndDesc = <TitleAndDesc title="New Schedule"  />;
  return currSlide === 0 ? (
    <>
      {titleAndDesc}
      <Header headerTitle="New" returnLinkUrl={'../admin/schedules'} linkText={'Back to all'} />
      <ScheduleForm onSubmit={handleSubmit} />
    </>
  ) : (
    <>
      {titleAndDesc}
      <Header headerTitle="Success!" returnLinkUrl={'../admin/schedules'} linkText={'Back to all'} />
    </>
  )
}