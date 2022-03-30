import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContext } from "../../../contexts/toast-context/toast-context";

import { deleteSchedule } from "../../../services/scheduleService";

import ScheduleForm from "../../shared/forms/schedule-form/schedule-form";
import Header from "../../shared/header/header";

export default function DeleteSchedule() {
  const { id } = useParams();
  const { createToast } = useContext(ToastContext);

  const [currSlide, setCurrSlide] = useState(0);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const handleConfirm = () => {
    setDeleteConfirmed(true);
  }

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while deleting schedule."), []);
  useEffect(() => {
    if (!deleteConfirmed || !id) return;
    const sendData = async () => {
      const res = await deleteSchedule(id);
      if (res) setCurrSlide(1);
    }
    sendData().catch(onError);
  }, [deleteConfirmed, id]);
  /* eslint-enable */

  return currSlide === 0 ? (
    <>
      <Header headerTitle={`Delete`} returnLinkUrl={'../admin/schedules'} linkText={'Back to all'} />
      <ScheduleForm id={id} readOnly />
      <h2 className="title text-center">Are you sure you want to delete this?</h2>
      <div className="flex col-center">
        <button className="btn" onClick={handleConfirm}>Delete</button>
      </div>
    </>
  ) : (
    <>
      <Header headerTitle="Success!" returnLinkUrl={'../admin/schedules'} linkText={'Back to all'} />
    </>
  )
}