import { differenceInMinutes, format } from "date-fns";
import parse from "date-fns/parse";
import add from "date-fns/add";
import ITimeSlot from "../interfaces/timeslot";

const TIMEFORMAT = "p";

export function getAvailableTimeSlots(
  availability: ITimeSlot[],
  appointmentLength: number
) {
  const DATEREF = new Date();
  let availableTimes: ITimeSlot[] = [];

  availability.forEach((ele) => {
    let fd = parse(ele.from, TIMEFORMAT, DATEREF);
    let td = parse(ele.to, TIMEFORMAT, DATEREF);
    const duration = differenceInMinutes(td, fd, {
      roundingMethod: "ceil",
    });
    const slots = getSlots(fd, duration, appointmentLength);
    availableTimes = availableTimes.concat(slots);
  });

  return availableTimes;
}

function getSlots(
  startDate: Date,
  minutesAvailable: number,
  appointmentLength: number
) {
  let slots: ITimeSlot[] = [];
  let currTime = startDate;
  while (minutesAvailable - appointmentLength >= 0) {
    slots.push(formatAppointment(currTime, appointmentLength));
    currTime = add(currTime, { minutes: appointmentLength });
    minutesAvailable -= appointmentLength ;
  }

  return slots;
}

function formatAppointment(appointment: Date, appointmentDuration: number): ITimeSlot {
  const endTime = add(appointment, { minutes: appointmentDuration });
  return { from: format(appointment, TIMEFORMAT), to: format(endTime, TIMEFORMAT) };
}
