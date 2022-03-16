import React, { useEffect, useState } from 'react';
import * as dateFns from "date-fns";

import { getMonthOverview } from '../../../services/appointmentService';
import ICalendar from './ICalendar';

import './calendar.css'

export default function Calendar({ handleSelectedDate }: ICalendar) {
  const [selectedDate, setDate] = useState(new Date());
  const [currentMonth, setMonth] = useState(new Date());

  const nextMonth = () => setMonth(dateFns.addMonths(currentMonth, 1));
  const prevMonth = () => setMonth(dateFns.subMonths(currentMonth, 1));
  const onDateClick = (day: Date) => {
    setDate(day);
    handleSelectedDate(day);
  }

  const [overview, setOverview] = useState<number[]>([])
  useEffect(() => {
    const fetchData = async () => {
      let data = await getMonthOverview(currentMonth, console.error);
      setOverview(data);
    }
    fetchData();
  }, [currentMonth]);

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  const renderDays = () => {
    const dateFormat = "eee";
    const days = [];

    let startDate = dateFns.startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  const renderCells = () => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${!dateFns.isSameMonth(cloneDay, monthStart) ||
              (!dateFns.isToday(cloneDay) && dateFns.isAfter(new Date(), cloneDay)) ||
              overview?.includes(cloneDay.getDate())
              ? "disabled"
              : dateFns.isSameDay(cloneDay, selectedDate) ? "selected" : ""
              }`}
            key={JSON.stringify(cloneDay)}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={JSON.stringify(day)}>
          {days}
        </div>
      );
      days = [];
    }
    return (<div className="body">{rows}</div>);
  }

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}