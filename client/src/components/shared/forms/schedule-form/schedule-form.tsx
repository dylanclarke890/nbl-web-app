import React, { useCallback, useContext, useEffect, useState } from "react";

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
import { getTimeStampAsDate, overlapsWithTimeSlot, sortByTimeSlot, sortByWeekdayScore, to24hr, toMeridian } from "../../../../helpers/timeSort";
import useOnInitialized from "../../../../custom-hooks/useOnInitialized";
import { ToastContext } from "../../../../contexts/toast-context/toast-context";
import { LoadingContext } from "../../../../contexts/loading-context/loading-context";

export default function ScheduleForm({ id, onSubmit, readOnly }: IScheduleForm) {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);
  
  const [currSlide, setCurrSlide] = useState(0);
  const [name, setName] = useState("");
  const dateWithoutTime = (d: Date) => new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
  const [startDate, setStartDate] = useState(dateWithoutTime(new Date()));
  const [endDate, setEndDate] = useState(dateWithoutTime(new Date()));
  const [runsIndefinitely, setRunsIndefinitely] = useState(true);

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const hasNoAvailabilityFor = useCallback((weekday: string) => {
    const day = availabilities.find(a => a.day === weekday);
    return day === undefined || day.times.length === 0;
  }, [availabilities]);

  const [mon, setMon] = useState(hasNoAvailabilityFor("monday"));
  const [tue, setTue] = useState(hasNoAvailabilityFor("tuesday"));
  const [wed, setWed] = useState(hasNoAvailabilityFor("wednesday"));
  const [thu, setThu] = useState(hasNoAvailabilityFor("thursday"));
  const [fri, setFri] = useState(hasNoAvailabilityFor("friday"));
  const [sat, setSat] = useState(hasNoAvailabilityFor("saturday"));
  const [sun, setSun] = useState(hasNoAvailabilityFor("sunday"));

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [firSlideErrs, setFirSlideErrs] = useState({
    name: "",
    date: "",
    error: true
  });
  const [secSlideErrs, setSecSlideErrs] = useState({
    timeSlot: "",
    error: false
  });
  const updateSlide = (n: number) => {
    if (currSlide === 0) {
      if (firSlideErrs.error) return;
      if (!isValidName()) return;
      if (!isValidDate()) return;
    };
    if (currSlide === 1 && secSlideErrs.error) return;
    setCurrSlide(n);
  }

  // First Slide
  const isValidName = (n = name) => {
    if (n.length === 0) {
      setFirSlideErrs((curr) => ({
        ...curr,
        name: "Need a name.",
        error: true
      }));
      return false;
    } else {
      setFirSlideErrs((curr) => ({
        ...curr,
        name: "",
        error: false
      }));
    }
    return true;
  };
  const isValidDate = (fr = startDate, to = endDate, runsIndef = runsIndefinitely) => {
    if (!runsIndef && to.valueOf() < fr.valueOf()) {
      setFirSlideErrs((curr) => ({
        ...curr,
        date: "End date can't be before start date.",
        error: true
      }));
      return false;
    } else {
      setFirSlideErrs((curr) => ({
        ...curr,
        date: "",
        error: false
      }));
    };
    return true;
  };
  const updateName = (n: string) => {
    setName(n);
    isValidName(n);
  }
  const updateStartDate = (d: Date) => {
    setStartDate(d);
    if (!runsIndefinitely) {
      isValidDate(d, endDate, runsIndefinitely);
    }
  }
  const updateEndDate = (d: Date) => {
    setEndDate(d);
    isValidDate(startDate, d, runsIndefinitely);
  }
  const updateRunsIndefinitely = () => {
    isValidDate(startDate, endDate, !runsIndefinitely)
    setRunsIndefinitely(!runsIndefinitely);
  };

  // Second slide 
  const [times, setTimes] = useState<ITimeSlot[]>([]);
  const [editing, setEditing] = useState(false);
  const isValidTime = () => {
    if (from === "" || to === "") {
      setSecSlideErrs((curr) => ({
        ...curr,
        timeSlot: "Need both times for a slot.",
        error: true
      }));
      return false;
    } else {
      setSecSlideErrs((curr) => ({
        ...curr,
        timeSlot: "",
        error: false
      }));
    }

    if (getTimeStampAsDate(from).valueOf() > getTimeStampAsDate(to).valueOf()) {
      setSecSlideErrs((curr) => ({
        ...curr,
        timeSlot: "Till time should come after from time.",
        error: true
      }));
      return false;
    } else {
      setSecSlideErrs((curr) => ({
        ...curr,
        timeSlot: "",
        error: false
      }));
    };

    if (times.some(t => overlapsWithTimeSlot(t, from, to))) {
      setSecSlideErrs((curr) => ({
        ...curr,
        timeSlot: "Time slots overlap with existing ones",
        error: true
      }));
      return false;
    } else {
      setSecSlideErrs((curr) => ({
        ...curr,
        timeSlot: "",
        error: false
      }));
    };

    return true;
  }
  const addSlot = () => {
    if (!isValidTime()) return;
    setTimes(curr => [...curr, { from: toMeridian(from), to: toMeridian(to) }])
    setFrom("");
    setTo("");
  }
  const editSlot = (i: number) => {
    const item = times[i];
    removeSlot(item);
    setFrom(to24hr(item.from));
    setTo(to24hr(item.to));
  }
  const deleteSlot = (i: number) => {
    removeSlot(times[i]);
    setFrom("");
    setTo("");
  }
  const removeSlot = (item: ITimeSlot) => {
    let newTimes = times.filter(e => e !== item);
    setTimes(newTimes);
  };

  const getDay = useCallback((day: string) => availabilities.find(a => a.day === day), [availabilities]);
  const updateAvailabilities = (day: string) => {
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

  useEffect(() => {
    if (editing) return;
    setMon(hasNoAvailabilityFor('monday'));
    setTue(hasNoAvailabilityFor('tuesday'));
    setWed(hasNoAvailabilityFor('wednesday'));
    setThu(hasNoAvailabilityFor('thursday'));
    setFri(hasNoAvailabilityFor('friday'));
    setSat(hasNoAvailabilityFor('saturday'));
    setSun(hasNoAvailabilityFor('sunday'));
  }, [availabilities, getDay, editing, hasNoAvailabilityFor])
  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while loading schedule."), []);
  useEffect(() => {
    if (!id || loading) return;
    isLoading();
    const fetchData = async () => {
      const result = await getSchedule(id);
      setName(result.name);
      setStartDate(result.starts);
      setAvailabilities(result.availability);
      setRunsIndefinitely(result.runsIndefinitely);
      setEndDate(result.ends == null ? new Date() : result.ends!);
      setCurrSlide(onSubmit ? 0 : 1);
    }
    fetchData().catch(onError);
    loaded();
  }, [id, onSubmit]);
  /* eslint-enable */
  useOnInitialized(() => {
    setFirSlideErrs((curr) => ({
      name: "",
      date: "",
      error: false
    }));
    setSecSlideErrs((curr) => ({
      timeSlot: "",
      error: false
    }));
  }, [])

  const setDayBeingEdited = (day: string) => {
    setEditing(true);
    setMon(false);
    setTue(false);
    setWed(false);
    setThu(false);
    setFri(false);
    setSat(false);
    setSun(false);
    switch (day) {
      case "monday":
        setMon(true);
        return;
      case "tuesday":
        setTue(true);
        return;
      case "wednesday":
        setWed(true);
        return;
      case "thursday":
        setThu(true);
        return;
      case "friday":
        setFri(true);
        return;
      case "saturday":
        setSat(true);
        return;
      case "sunday":
        setSun(true);
        return;
      default:
        return;
    }
  }
  const editDayAvailability = (a: Availability) => {
    setDayBeingEdited(a.day);
    setAvailabilities(availabilities.filter(av => av !== a));
    setTimes(a.times);
  }
  const deleteDayAvailability = (a: Availability) => {
    setAvailabilities(availabilities.filter(av => av !== a));
  }
  const saveTimes = () => {
    if (mon) updateAvailabilities("monday");
    if (tue) updateAvailabilities("tuesday");
    if (wed) updateAvailabilities("wednesday");
    if (thu) updateAvailabilities("thursday");
    if (fri) updateAvailabilities("friday");
    if (sat) updateAvailabilities("saturday");
    if (sun) updateAvailabilities("sunday");
    setEditing(false);
    setTimes([]);
  }

  const forwardClick = () => {
    if (!onSubmit || firSlideErrs.error || secSlideErrs.error) return;
    const model = new Schedule(id!, name, startDate, availabilities, runsIndefinitely, runsIndefinitely ? undefined : endDate);
    onSubmit!(model);
  }

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

    return applicable !== "" ? applicable.substring(0, applicable.lastIndexOf(",")).trim() : "None Selected";
  }
  const inputButton = (onClick: any, name: string, extraClasses: string) => onSubmit ? <button className={`btn ${extraClasses}`} onClick={onClick}>{name}</button> : null;
  const endDateInput = !runsIndefinitely ? (
    <CustomDateInput inputId="end-date"
      value={endDate}
      error=""
      labelText="Ends"
      onChange={(date: string) => updateEndDate(new Date(date))}
      readOnly={readOnly}
    />) : null;

  return currSlide === 0 ? (
    <>
      <div className="mb-1"></div>
      <div className="schedule-form text-center semi-bold">
        <CustomInput inputId={"name"}
          value={name}
          active={name !== ""}
          error={firSlideErrs.name}
          onChange={updateName}
          readonly={readOnly}
        />
        <div className="flex justify-between mb-1">
          <CustomDateInput inputId="start-date"
            value={startDate}
            error=""
            labelText="Starts"
            onChange={(date: string) => updateStartDate(new Date(date))}
            readOnly={readOnly}
          />
          {endDateInput}
        </div>
        <div className="center-content mb-2">
          <CustomCheckbox inputId="runs-indefinitely"
            labelText="Runs Indefinitely?"
            isChecked={runsIndefinitely}
            onChange={updateRunsIndefinitely}
            readOnly={readOnly}
          />
        </div>
        <p className="text-center text-error">{firSlideErrs.date}</p>
        <button className="btn" onClick={() => updateSlide(1)}>Next</button>
      </div>
    </>
  ) : (
    <>
      <div className="availability-form semi-bold">
        {onSubmit ? <>
          <div className="availability-table">
            <h1 className="sub-title text-center">Adding availability for: {getCurrApplicableDays()}</h1>
            <table>
              <thead>
                <tr>
                  <th>Time Slot (From - To)</th>
                </tr>
              </thead>
              <tbody>
                {times.length > 0 ? sortByTimeSlot(times).map(m => {
                  const index = times.indexOf(m);
                  return (
                    <tr key={index}>
                      <td>{m.from} - {m.to}</td>
                      <td>
                        {inputButton(() => editSlot(index), "Edit Slot", " btn-sm mr-1")}
                        {inputButton(() => deleteSlot(index), "Delete Slot", " btn-sm")}
                      </td>
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
              error={""}
              labelText="Available From"
              onChange={setFrom}
              readOnly={readOnly}
            />
            <CustomTimeInput inputId="to"
              value={to}
              error={""}
              labelText="Available Till"
              onChange={setTo}
              readOnly={readOnly}
            />
          </div>
          <p className="text-center text-error">{secSlideErrs.timeSlot}</p>
          <div className="flex justify-center mb-2">
            {inputButton(addSlot, "Add Time Slot", " btn-sm")}
          </div>
          <h2 className="sub-title text-center semi-bold">Add availability for:</h2>
          <div className="weekday-inputs flex justify-evenly mt-1 mb-1">
            <WeekdayCheckboxList readOnly={readOnly} mon={mon} setMon={setMon}
              tue={tue} setTue={setTue} wed={wed} setWed={setWed} thu={thu} setThu={setThu}
              fri={fri} setFri={setFri} sat={sat} setSat={setSat} sun={sun} setSun={setSun}
            />
          </div></> : null}
        <div className="flex justify-center mb-1">
          {inputButton(saveTimes, "Save and Add Other Day(s)", " btn-sm")}
        </div>
        <div className="mb-2">
          <h1 className="title text-center semi-bold">Schedule Summary</h1>
          <h1 className="title text-center">Schedule Name: {name ? name : "No Name Set"}</h1>
          <h1 className="title text-center">Starts: {startDate.toDateString()}</h1>
          <h1 className="title text-center">Runs Till: {runsIndefinitely ? "Indefinitely" : endDate.toDateString()}</h1>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Availability</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {availabilities.length > 0 ? sortByWeekdayScore(availabilities).map(m => (
                <tr key={availabilities.indexOf(m)}>
                  <td>{m.day}</td>
                  <td className="overflow-x-auto">{sortByTimeSlot(m.times).map(t => `${t.from} - ${t.to}`).join(", ")}</td>
                  <td>{inputButton(() => editDayAvailability(m), "Edit", " btn-sm mr-1")} {inputButton(() => deleteDayAvailability(m), "Delete", " btn-sm")}</td>
                </tr>
              )) : (
                <tr>
                  <td>No entries yet.</td>
                  <td>No entries yet.</td>
                  <td>No entries yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-evenly">
          {inputButton(() => updateSlide(0), "Back", "")}
          {inputButton(forwardClick, "Save Schedule", "")}
        </div>
      </div>
    </>
  )
}
