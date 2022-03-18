import ITimeSlot from "../interfaces/ITimeSlot";
import Appointment from "../models/appointment";
import Availability from "../models/availability";

const getDate = (hour: number, minutes: number) =>
  new Date(2000, 1, 1, hour, minutes);

const getTimeStampAsDate = (time: string) => {
  const splitAtColon = time.split(":");
  let hour = parseInt(splitAtColon[0]);

  const splitAtWhiteSpace = splitAtColon[1].split(" ");
  const minutes = parseInt(splitAtWhiteSpace[0]);

  const meridian = splitAtWhiteSpace[1];

  if (meridian === "AM" && hour === 12) {
    hour = 0;
  }

  if (meridian === "PM" && hour !== 12) {
    hour += 12;
  }

  return getDate(hour, minutes);
};

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
