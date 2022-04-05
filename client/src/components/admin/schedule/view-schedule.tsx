import React from "react";
import { useParams } from "react-router-dom";

import ScheduleForm from "../../shared/forms/schedule-form/schedule-form";
import Header from "../../shared/header/header";
import TitleAndDesc from "../../shared/title-and-desc/title-and-desc";

export default function ViewSchedule() {
  const { id } = useParams();

  return (
    <>
      <TitleAndDesc title="View Schedule"  />
      <Header headerTitle={`View`} returnLinkUrl={'../admin/schedules'} linkText={'Back to all'} />
      <ScheduleForm id={id} readOnly />
    </>
  )
}