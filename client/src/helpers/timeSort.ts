import ITimeSlot from "../interfaces/ITimeSlot";
import Appointment from "../models/appointment";
import Availability from "../models/availability";

const getDate = (hour: number, minutes: number) =>
  new Date(2000, 1, 1, hour, minutes);

export function toMeridian(time: string) {
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

const getTimeStampAsDate = (time: string) => {
  const [hour, min] = parseMeridianTime(time);
  return getDate(hour, min);
};

export function to24hr(time: string) {
  const [hour, min] = parseMeridianTime(time);
  let strHour = hour.toString();
  if (strHour.length === 1) strHour = `0${strHour}`;
  return `${strHour}:${min}`;
}

function parseMeridianTime(time: string) : [hour: number, minutes: number] {
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
