import { differenceInMinutes, format } from "date-fns";
import parse from "date-fns/parse";
import add from "date-fns/add";
import ITimeSlot from "../interfaces/timeslot";

const TIMEFORMAT = "p";
const DATEREF = new Date();

export function getAvailableTimeSlots(
  times: ITimeSlot[],
  appointmentLength: number
) {
  let availableTimes: ITimeSlot[] = [];

  times.forEach((ele) => {
    let fd = parse(ele.from, TIMEFORMAT, DATEREF);
    let td = parse(ele.to, TIMEFORMAT, DATEREF);
    const duration = differenceInMinutes(td, fd, {
      roundingMethod: "ceil",
    });
    const slots = getSlots(fd, appointmentLength, duration);
    availableTimes = availableTimes.concat(slots);
  });

  console.log(availableTimes);

  return availableTimes.sort();
}

function getSlots(
  startDate: Date,
  appointmentLength: number,
  durationInMinutes: number
) {
  let slots: ITimeSlot[] = [];
  let currTime = startDate;
  while (durationInMinutes > 0) {
    if (durationInMinutes - appointmentLength < 0) break;

    slots.push(formatAppointment(currTime, appointmentLength));
    currTime = add(currTime, { minutes: appointmentLength });
    durationInMinutes -= appointmentLength;
  }

  return slots;
}

function formatAppointment(time: Date, length: number): ITimeSlot {
  const endTime = add(time, { minutes: length });
  return { from: format(time, TIMEFORMAT), to: format(endTime, TIMEFORMAT) };
}
