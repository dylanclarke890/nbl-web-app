let mongoose = require("mongoose");
let AppointmentModel = require("../models/appointment");
import { format } from "date-fns";
import ITimeSlot from "../interfaces/timeslot";
import { getScheduleInUse } from "./scheduleService";
import { getAvailableTimeSlots } from "./timeService";

export async function addAppointment(req: any) {
  const data = req.body;

  if (await hasExistingAppointment(data.date, data.time.from)) {
    return { message: "Appointment already exists." };
  }

  let appointment = new AppointmentModel({
    person: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
    date: data.date,
    time: {
      from: data.time.from,
      to: data.time.to,
    },
    appointmentType: "nails",
  });

  try {
    await appointment.save();
  } catch (e) {
    console.error(e);
    return { message: "Error whilst saving." };
  }

  return { appointment };
}

export async function getAppointments(req: any) {
  const params = req.params;
  const day = new Date(
    parseInt(params.year),
    parseInt(params.month),
    parseInt(params.day)
  );

  const existingAppointments = await getExistingAppointments(day);
  const schedule = await getScheduleInUse(day);
  const scheduleForToday = schedule.availability.find(
    (a: { day: string; times: any[] }) =>
      a.day === format(day, "EEEE").toLowerCase()
  );
  const availableTimeSlots = getAvailableTimeSlots(
    scheduleForToday.times,
    30,
    existingAppointments
  );
  return { times: availableTimeSlots };
}

async function getExistingAppointments(date: Date) {
  let existing = await AppointmentModel.find({ date: date });
  let existingTimes: ITimeSlot[] = [];
  existing.forEach((app: { time: ITimeSlot }) => {
    existingTimes.push(app.time);
  });

  return existingTimes;
}

async function hasExistingAppointment(
  date: Date,
  from: string
): Promise<boolean> {
  let res = await AppointmentModel.where("date")
    .equals(date)
    .where("time.from")
    .equals(from);
  return res.length !== 0;
}
