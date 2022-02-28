import { differenceInMinutes, format } from "date-fns";
import parse from "date-fns/parse";
import add from "date-fns/add";
import ITimeSlot from "../interfaces/timeslot";

const TIMEFORMAT = "p";

export function getAvailableTimeSlots(
  times: ITimeSlot[],
  appointmentLength: number
  ) {
    const DATEREF = new Date();
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

  return availableTimes;
}

function getSlots(
  startDate: Date,
  appointmentLength: number,
  durationInMinutes: number
) {
  let slots: ITimeSlot[] = [];
  let currTime = startDate;
  while (durationInMinutes - appointmentLength > 0) {
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
