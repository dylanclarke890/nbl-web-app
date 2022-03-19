import { differenceInMinutes, format } from "date-fns";
import parse from "date-fns/parse";
import add from "date-fns/add";

import ITimeSlot from "../interfaces/ITimeSlot";

const TIMEFORMAT = "p";
const DATEREF = new Date();

export function getAvailableTimeSlots(
  availability: ITimeSlot[],
  appointmentLength: number,
  existingAppointments: ITimeSlot[]
): ITimeSlot[] {
  let availableTimes: ITimeSlot[] = [];

  for (let i = 0; i < availability.length; i++) {
    const ele = availability[i];

    let fd = parse(ele.from, TIMEFORMAT, DATEREF);
    let td = parse(ele.to, TIMEFORMAT, DATEREF);

    const duration = differenceInMinutes(td, fd, {
      roundingMethod: "ceil",
    });
    const slots = getSlots(
      fd,
      duration,
      appointmentLength,
      existingAppointments
    );

    availableTimes = availableTimes.concat(slots);
  }

  return availableTimes;
}

function getSlots(
  startDate: Date,
  minutesAvailable: number,
  appointmentLength: number,
  existingAppointments: ITimeSlot[],
  interval = 15 // Used to specify the gap between available slots
): ITimeSlot[] {
  let slots: ITimeSlot[] = [];
  let currTime = startDate;
  const endTime = add(startDate, {minutes: minutesAvailable});
  
  console.log("endTime");
  console.log(endTime);
  while (minutesAvailable - appointmentLength >= 0) {
    const appointmentEnd = add(currTime, { minutes: appointmentLength });
    if (appointmentEnd.valueOf() > endTime.valueOf()) break;

    if (
      existingAppointments.some((app) => {
        const from = parse(app.from, TIMEFORMAT, DATEREF);
        const to = parse(app.to, TIMEFORMAT, DATEREF);
        return (
          from.valueOf() === currTime.valueOf() ||
          to.valueOf() === appointmentEnd.valueOf()
        );
      })
    ) {
      currTime = appointmentEnd;
      continue;
    }
    slots.push(formatAppointment(currTime, appointmentLength));

    currTime = add(currTime, { minutes: interval });
    minutesAvailable -= interval;
  }

  return slots;
}

function formatAppointment(
  appointment: Date,
  appointmentDuration: number
): ITimeSlot {
  const endTime = add(appointment, { minutes: appointmentDuration });
  return {
    from: format(appointment, TIMEFORMAT),
    to: format(endTime, TIMEFORMAT),
  };
}
