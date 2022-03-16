import React, { useEffect, useState } from "react";

import { getSchedule } from "../../../../services/scheduleService";
import IScheduleForm from "./IScheduleForm";

import Schedule from "../../../../models/schedule";
import Availability from "../../../../models/availability";

import CustomCheckbox from "../../input/custom-checkbox/custom-checkbox";
import CustomInput from "../../input/custom-input/custom-input";

import './schedule-form.css';

export default function ScheduleForm({ id, onSubmit, readOnly }: IScheduleForm) {

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [availability, setAvailability] = useState<Availability[]>([]);

  const [showEndDateInput, setShowEndDateInput] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

  const [modelValidation, setModelValidation] = useState({
    name: "",
    starts: "",
    availability: "",
    ends: ""
  });


  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const result = await getSchedule(id, console.error);
      setName(result.name);
      setStartDate(result.starts);
      setAvailability(result.availability);
      setEndDate(result.ends);
    }
    fetchData().catch(console.error);

  }, [id]);


  const handleShowEndDateChange = () => {
    setShowEndDateInput(!showEndDateInput);
  };

  const forwardClick = () => {
    if (!onSubmit) return;

    const model = new Schedule(id!, name, startDate, availability, endDate);
    onSubmit!(model);
  }
  const submitButton = onSubmit ? <button className="btn" onClick={forwardClick}>Save</button> : null;

  return (
    <>
      <div className="schedule-form">
        <CustomInput inputId={"name"}
          value={name}
          active={name !== ""}
          error={modelValidation.name}
          onChange={setName}
          readonly={readOnly}
        />
        <CustomCheckbox inputId="show-end-date"
          labelText="Add expiry date?"
          isChecked={showEndDateInput}
          onChange={handleShowEndDateChange}
        />
        {submitButton}
      </div>
    </>
  )
}