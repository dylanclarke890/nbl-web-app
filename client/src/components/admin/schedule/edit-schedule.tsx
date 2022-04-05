import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { editSchedule } from "../../../services/scheduleService";
import Schedule from "../../../models/schedule";

import ScheduleForm from "../../shared/forms/schedule-form/schedule-form";
import Header from "../../shared/header/header";
import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { LoadingContext } from "../../../contexts/loading-context/loading-context";
import TitleAndDesc from "../../shared/title-and-desc/title-and-desc";

export default function EditSchedule() {
  const { id } = useParams();
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

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
    if (!readyToSubmit || loading) return;
    const sendData = async () => {
      isLoading();
      const res = await editSchedule(schedule);
      if (res) setCurrSlide(1);
      loaded();
    }
    sendData().catch(() => { onError(); loaded(); });;
  }, [schedule, readyToSubmit]);
  /* eslint-enable */

  const titleAndDesc = <TitleAndDesc title="Edit Schedule" desc="" />;
  return currSlide === 0 ? (
    <>
      {titleAndDesc}
      <Header headerTitle={`Edit`} returnLinkUrl={'../admin/schedules'} linkText={'Back to all'} />
      <ScheduleForm id={id} onSubmit={handleSubmit} />
    </>
  ) : (
    <>
      {titleAndDesc}
      <Header headerTitle="Success!" returnLinkUrl={'../admin/schedules'} linkText={'Back to all'} />
    </>
  )
}