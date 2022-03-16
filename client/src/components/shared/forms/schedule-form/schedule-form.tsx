import React, { useEffect, useState } from "react";

import { getSchedule } from "../../../../services/scheduleService";
import IScheduleForm from "./IScheduleForm";

import Schedule from "../../../../models/schedule";
import Availability from "../../../../models/availability";

import CustomCheckbox from "../../input/custom-checkbox/custom-checkbox";
import CustomInput from "../../input/custom-input/custom-input";

import './schedule-form.css';
import CustomDateInput from "../../input/custom-date-input/custom-date-input";
import CustomTimeInput from "../../input/custom-time-input/custom-time-input";

export default function ScheduleForm({ id, onSubmit, readOnly }: IScheduleForm) {

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
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
      setEndDate(result.ends == null ? new Date() : result.ends!);
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
  const endDateInput = showEndDateInput ? 
  <CustomDateInput inputId="startDate"
    value={startDate}
    error={modelValidation.ends}
    labelText="Ends:"
    onChange={(date: string) => setEndDate(new Date(date))}
    readOnly={readOnly}
  /> : null;
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
        <CustomDateInput inputId="startDate"
          value={startDate}
          error={modelValidation.starts}
          labelText="Starts:"
          onChange={(date: string) => setStartDate(new Date(date))}
          readOnly={readOnly}
        />
        <CustomTimeInput inputId="from"
          value={from}
          error={""}
          labelText="From:"
          onChange={setFrom}
          readOnly={readOnly}
        />
        <CustomTimeInput inputId="to"
          value={to}
          error={""}
          labelText="To:"
          onChange={setTo}
          readOnly={readOnly}
        />
        {endDateInput}
        <CustomCheckbox inputId="show-end-date"
          labelText="Add expiry date?"
          isChecked={showEndDateInput}
          onChange={handleShowEndDateChange}
          readOnly={readOnly}
        />
        {submitButton}
      </div>
    </>
  )
}