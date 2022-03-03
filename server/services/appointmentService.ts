let mongoose = require("mongoose");
let AppointmentModel = require("../models/appointment");
import { endOfMonth, format, getDaysInMonth, startOfMonth } from "date-fns";
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

export async function getDailyAppointments(req: any) {
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

export async function getMonthOverview(req: any) {
  const params = req.params;
  const month = new Date(parseInt(params.year), parseInt(params.month), 1);
  const start = startOfMonth(month);
  const end = endOfMonth(month);

  const daysInMonth = getDaysInMonth(month);
  let overview = new Map();
  for (let num = 1; num <= daysInMonth; num++) {
    let currDate = month;
    currDate.setDate(num);
    
    const schedule = await getScheduleInUse(currDate);
    const scheduleForToday = schedule.availability.find(
      (a: { day: string; times: any[] }) =>
        a.day === format(currDate, "EEEE").toLowerCase()
    );

    if (!scheduleForToday.times.length) {
      overview.set(num, { full: false, unavailable: true })
    }
  }
  let apps = await AppointmentModel.find({
    date: {
      $gte: start,
      $lt: end,
    },
  });

  // const unique = [
  //   ...new Set<number>(apps.map((item: { date: Date }) => item.date.getDate())),
  // ];

  return overview;
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
