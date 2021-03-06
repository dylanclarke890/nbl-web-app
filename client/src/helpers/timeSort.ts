import ITimeSlot from "../interfaces/ITimeSlot";
import Appointment from "../models/appointment";
import Availability from "../models/availability";

const invalidTime = (time: string) => time === undefined || time === "";

const getDate = (hour: number, minutes: number) =>
  new Date(2000, 1, 1, hour, minutes);

export function toMeridian(time: string) {
  if (invalidTime(time)) return time;
  const splitAtColon = time.split(":");
  let hour = parseInt(splitAtColon[0]);
  const min = splitAtColon[1];
  let meridian = hour > 11 ? "PM" : "AM";

  if (hour > 11) {
    hour -= 12;
  }

  if (hour === 0) {
    hour = 12;
  }

  return `${hour}:${min} ${meridian}`;
}

export function getTimeStampAsDate(time: string) {
  if (invalidTime(time)) return new Date();
  const [hour, min] = parseMeridianTime(time);
  return getDate(hour, min);
}

export function to24hr(time: string) {
  if (time === undefined || time === "") return time;
  const [hourNum, minNum] = parseMeridianTime(time);
  const strHour = hourNum.toString();

  const hour = strHour.length === 1 ? `0${strHour}` : strHour;
  const min = minNum === 0 ? "00" : minNum.toString();

  return `${hour}:${min}`;
}

function parseMeridianTime(time: string): [hour: number, minutes: number] {
  const splitAtColon = time.split(":");
  let hour = parseInt(splitAtColon[0]);

  const splitAtWhiteSpace = splitAtColon[1].split(" ");
  const min = parseInt(splitAtWhiteSpace[0]);

  const meridian = splitAtWhiteSpace[1];

  if (meridian === "AM" && hour === 12) {
    hour = 0;
  }

  if (meridian === "PM" && hour !== 12) {
    hour += 12;
  }

  return [hour, min];
}

export function sortByTimeStamp(times: Appointment[]) {
  times.sort((a, b) => {
    return (
      getTimeStampAsDate(a.from).valueOf() -
      getTimeStampAsDate(b.from).valueOf()
    );
  });

  return times;
}

export function sortByTimeSlot(times: ITimeSlot[]) {
  times.sort((a, b) => {
    return (
      getTimeStampAsDate(a.from).valueOf() -
      getTimeStampAsDate(b.from).valueOf()
    );
  });

  return times;
}

export function sortByWeekdayScore(availabilities: Availability[]) {
  availabilities.sort((a, b) => {
    return getWeekdayScore(a.day) - getWeekdayScore(b.day);
  });
  return availabilities;
}

export function overlapsWithTimeSlot(
  time: ITimeSlot,
  from: string,
  to: string
) {
  const start = getTimeStampAsDate(time.from);
  const end = getTimeStampAsDate(time.to);
  const fromTime = getTimeStampAsDate(from);
  const toTime = getTimeStampAsDate(to);

  const toMs = (t: Date) => t.valueOf();

  const isEarlierThanTimeSlot =
    toMs(fromTime) < toMs(start) &&
    toMs(fromTime) < toMs(end) &&
    toMs(toTime) < toMs(start) &&
    toMs(toTime) < toMs(end);

  const isLaterThanTimeSlot =
    toMs(fromTime) > toMs(start) &&
    toMs(fromTime) > toMs(end) &&
    toMs(toTime) > toMs(start) &&
    toMs(toTime) > toMs(end);

    // return true only if from and before are before or after the timeslot.
  return !(isEarlierThanTimeSlot || isLaterThanTimeSlot);
}

function getWeekdayScore(day: string) {
  switch (day) {
    case "monday":
      return 0;
    case "tuesday":
      return 1;
    case "wednesday":
      return 2;
    case "thursday":
      return 3;
    case "friday":
      return 4;
    case "saturday":
      return 5;
    case "sunday":
      return 6;
    default:
      throw new Error("Couldn't determine day.");
  }
}
