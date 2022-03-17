import React, { useEffect, useState } from "react";

import { getSchedule } from "../../../../services/scheduleService";
import IScheduleForm from "./IScheduleForm";

import Schedule from "../../../../models/schedule";
import Availability from "../../../../models/availability";

import CustomCheckbox from "../../input/custom-checkbox/custom-checkbox";
import CustomInput from "../../input/custom-input/custom-input";
import CustomDateInput from "../../input/custom-date-input/custom-date-input";
import CustomTimeInput from "../../input/custom-time-input/custom-time-input";
import { WeekdayCheckboxList } from "../weekday-checkbox-list/weekday-checkbox-list";

import './schedule-form.css';
import ITimeSlot from "../../../../interfaces/ITimeSlot";
import { sortByWeekdayScore } from "../../../../helpers/timeSort";

export default function ScheduleForm({ id, onSubmit, readOnly }: IScheduleForm) {
  const [currSlide, setCurrSlide] = useState(0);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDateInput, setShowEndDateInput] = useState(false);

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const needsAvailability = (weekday: string) => availabilities.find(a => a.day === weekday) === undefined;

  const [mon, setMon] = useState(needsAvailability("monday"));
  const [tue, setTue] = useState(needsAvailability("tuesday"));
  const [wed, setWed] = useState(needsAvailability("wednesday"));
  const [thu, setThu] = useState(needsAvailability("thursday"));
  const [fri, setFri] = useState(needsAvailability("friday"));
  const [sat, setSat] = useState(needsAvailability("saturday"));
  const [sun, setSun] = useState(needsAvailability("sunday"));

  const getCurrApplicableDays = () => {
    let applicable = "";

    if (mon) {
      applicable += "Mon, "
    }
    if (tue) {
      applicable += "Tue, "
    }
    if (wed) {
      applicable += "Wed, "
    }
    if (thu) {
      applicable += "Thu, "
    }
    if (fri) {
      applicable += "Fri, "
    }
    if (sat) {
      applicable += "Sat, "
    }
    if (sun) {
      applicable += "Sun, "
    }

    return applicable !== "" ? applicable.substring(0, applicable.lastIndexOf(",")).trim() : "";
  }

  const [times, setTimes] = useState<ITimeSlot[]>([]);

  const addSlot = () => {
    setTimes(curr => [...curr, { from, to }])
    setFrom("");
    setTo("");
  }

  const editSlot = (i: number) => {
    const item = times[i];
    removeItem(item);
    setFrom(item.from);
    setTo(item.to);
  }

  const deleteSlot = (i: number) => {
    removeItem(times[i]);
    setFrom("");
    setTo("");
  }

  const removeItem = (item: ITimeSlot) => {
    let newTimes = times.filter(e => e !== item);
    setTimes(newTimes);
  };

  const getDay = (day: string) => availabilities.find(a => a.day === day);
  const updateDayAvailability = (day: string) => {
    const d = getDay(day);
    if (d === undefined) {
      setAvailabilities(curr => [...curr, new Availability(day, times)])
    } else {
      setAvailabilities(curr => curr.filter(a => a !== d));
      const set = new Set<ITimeSlot>();
      d.times.forEach(t => set.add(t));
      times.forEach(t => set.add(t));
      setAvailabilities(curr => [...curr, new Availability(d.day, [...set.values()])]);
    }
  }

  const saveTimes = () => {
    if (mon) updateDayAvailability("monday");
    if (tue) updateDayAvailability("tuesday");
    if (wed) updateDayAvailability("wednesday");
    if (thu) updateDayAvailability("thursday");
    if (fri) updateDayAvailability("friday");
    if (sat) updateDayAvailability("saturday");
    if (sun) updateDayAvailability("sunday");

    setTimes([]);
  }

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [firSlideErrs, setFirSlideErrs] = useState({
    name: "",
    starts: "",
    ends: ""
  });

  const [secSlideErrs, setSecSlideErrs] = useState({
    from: "",
    to: "",
    availability: "",
    availabilities: ""
  });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const result = await getSchedule(id, console.error);
      setName(result.name);
      setStartDate(result.starts);
      setAvailabilities(result.availability);
      setEndDate(result.ends == null ? new Date() : result.ends!);
    }
    fetchData().catch(console.error);

  }, [id]);

  const handleShowEndDateChange = () => {
    setShowEndDateInput(!showEndDateInput);
  };

  const forwardClick = () => {
    if (!onSubmit) return;

    const model = new Schedule(id!, name, startDate, availabilities, endDate);
    onSubmit!(model);
  }

  const submitButton = onSubmit ? <button className="btn" onClick={forwardClick}>Save</button> : null;
  const endDateInput = showEndDateInput ? (
    <CustomDateInput inputId="end-date"
      value={endDate}
      error={firSlideErrs.ends}
      labelText="Ends"
      onChange={(date: string) => setEndDate(new Date(date))}
      readOnly={readOnly}
    />) : null;

  return currSlide === 0 ? (
    <>
      <div className="schedule-form mt-1 text-center semi-bold">
        <CustomInput inputId={"name"}
          value={name}
          active={name !== ""}
          error={firSlideErrs.name}
          onChange={setName}
          readonly={readOnly}
        />
        <div className="date-inputs flex mb-1">
          <CustomDateInput inputId="start-date"
            value={startDate}
            error={firSlideErrs.starts}
            labelText="Starts"
            onChange={(date: string) => setStartDate(new Date(date))}
            readOnly={readOnly}
          />
          {endDateInput}
        </div>
        <div className="center-content mb-2">
          <CustomCheckbox inputId="show-end-date"
            labelText="Add expiry date?"
            isChecked={showEndDateInput}
            onChange={handleShowEndDateChange}
            readOnly={readOnly}
          />
        </div>
        <button className="btn" onClick={() => setCurrSlide(1)}>Next</button>
      </div>
    </>
  ) : (
    <>
      <div className="availability-form semi-bold">
        <div className="availability-table">
          <h1 className="sub-title text-center">Availability for: {getCurrApplicableDays()}</h1>
          <table>
            <thead>
              <tr>
                <th>Time Slot</th>
              </tr>
            </thead>
            <tbody>
              {times.length > 0 ? times.map(m => {
                const index = times.indexOf(m);
                return (
                  <tr key={index}>
                    <td>{m.from} - {m.to}</td>
                    <td><button className="btn btn-sm" onClick={() => editSlot(index)}>Edit Slot</button><button className="btn btn-sm" onClick={() => deleteSlot(index)}>Delete Slot</button></td>
                  </tr>
                )
              }) : (
                <tr>
                  <td>No entries yet.</td>
                  <td>No entries yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="time-inputs flex mt-2 mb-2">
          <CustomTimeInput inputId="from"
            value={from}
            error={secSlideErrs.from}
            labelText="Available From"
            onChange={setFrom}
            readOnly={readOnly}
          />
          <CustomTimeInput inputId="to"
            value={to}
            error={secSlideErrs.to}
            labelText="Available Till"
            onChange={setTo}
            readOnly={readOnly}
          />
        </div>
        <div className="flex justify-center mb-2">
          <button className="btn btn-sm" onClick={addSlot}>Add Time Slot</button>
        </div>
        <h2 className="sub-title text-center semi-bold">Add availability for:</h2>
        <div className="weekday-inputs flex justify-evenly mt-1 mb-1">
          <WeekdayCheckboxList readOnly={readOnly} mon={mon} setMon={setMon}
            tue={tue} setTue={setTue} wed={wed} setWed={setWed} thu={thu} setThu={setThu}
            fri={fri} setFri={setFri} sat={sat} setSat={setSat} sun={sun} setSun={setSun}
          />
        </div>
        <div className="flex justify-center mb-1">
          <button className="btn btn-sm" onClick={saveTimes}>Save and Add Other Day(s)</button>
        </div>
        <div className="mb-2">
          <h1 className="title text-center">{name ? name : "No Name Set"}</h1>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {availabilities.length > 0 ? sortByWeekdayScore(availabilities).map(m => (
                <tr key={availabilities.indexOf(m)}>
                  <td>{m.day}</td>
                  <td>{m.times.map(t => `${t.from} - ${t.to}`).join(", ")}</td>
                </tr>
              )) : (
                <tr>
                  <td>No entries yet.</td>
                  <td>No entries yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-evenly">
          <button className="btn" onClick={() => setCurrSlide(0)}>Back</button>
          {submitButton}
        </div>
      </div>
    </>
  )
}