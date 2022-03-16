import Appointment from "../models/appointment";

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
