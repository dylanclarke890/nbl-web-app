let mongoose = require("mongoose");
let AppointmentModel = require("../models/appointment");
import { format, getDaysInMonth } from "date-fns";
import ITimeSlot from "../interfaces/ITimeSlot";
import IAppointment from "../interfaces/IAppointment";
import { getScheduleInUse } from "./scheduleService";
import { getAvailableTimeSlots } from "./timeService";

export async function addAppointment(
  req: any
): Promise<
  | { message: string; appointment?: undefined }
  | { appointment: IAppointment; message?: undefined }
> {
  const data = req.body;

  if (await hasExistingAppointment(data.date, data.time.from)) {
    return { message: "Appointment already exists." };
  }

  let appointment = new AppointmentModel({
    person: { ...data.person },
    date: data.date,
    time: { ...data.time },
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

export async function getDailyAppointments(
  req: any
): Promise<{ times: ITimeSlot[] }> {
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
    scheduleForToday!.times,
    30,
    existingAppointments
  );

  return { times: availableTimeSlots };
}

export async function getMonthOverview(req: any): Promise<number[]> {
  const params = req.params;
  const month = new Date(parseInt(params.year), parseInt(params.month), 1);

  const daysInMonth = getDaysInMonth(month);
  let overview: number[] = [];
  for (let num = 1; num <= daysInMonth; num++) {
    let currDate = month;
    currDate.setDate(num);

    const schedule = await getScheduleInUse(currDate);
    const scheduleForToday = schedule.availability.find(
      (a: { day: string; times: any[] }): boolean =>
        a.day === format(currDate, "EEEE").toLowerCase()
    );

    if (!scheduleForToday!.times.length) {
      overview.push(num);
    }
  }

  return overview;
}

async function getExistingAppointments(date: Date): Promise<ITimeSlot[]> {
  let existing = await AppointmentModel.where("date").equals(date);
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
