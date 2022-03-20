let mongoose = require("mongoose");
import { format, getDaysInMonth } from "date-fns";

import ITimeSlot from "../interfaces/ITimeSlot";
import IAppointment from "../interfaces/IAppointment";
import IAvailability from "../interfaces/IAvailability";
let AppointmentModel = require("../models/appointment");

import { getAvailableTimeSlots } from "./time-service";
import { getScheduleInUse } from "./schedule-service";
import { getTreatment } from "./treatment-service";

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
    treatmentName: data.treatmentName,
  });

  try {
    await appointment.save();
  } catch (e) {
    console.error(e);
    return { message: "Error whilst saving." };
  }

  return { appointment };
}

export async function getAppointment(id: string): Promise<IAppointment> {
  return await AppointmentModel.findById(id).exec();
}

export async function getAllAppointments() {
  return await AppointmentModel.find();
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

  const treatment = await getTreatment(params.treatmentId);
  if (treatment.type === "")
    throw new Error("Should've had a value for appointment type.");

  const existingAppointments = await getExistingAppointments(day);

  const scheduleForToday = await getAvailabilityByDate(day);
  const availableTimeSlots = getAvailableTimeSlots(
    scheduleForToday!.times,
    treatment.duration,
    existingAppointments
  );

  return { times: availableTimeSlots };
}

export async function getMonthOverview(req: any): Promise<number[]> {
  const params = req.params;
  const month = new Date(parseInt(params.year), parseInt(params.month), 1);
  const monthToCheck = month.getMonth();
  const daysInMonth = getDaysInMonth(month);

  let overview: number[] = [];
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  for (let num = 1; num <= daysInMonth; num++) {
    if (monthToCheck <= currentMonth && num < currentDay) {
      overview.push(num);
      continue;
    }

    let dayToCheck = month;
    dayToCheck.setDate(num);

    const scheduleForToday = await getAvailabilityByDate(dayToCheck);
    if (!scheduleForToday!.times.length) {
      overview.push(num);
    }
  }

  return overview;
}

export async function editAppointment(id: string, item: any) {
  let success = false;
  const update = item.appointment;
  try {
    const doc = await AppointmentModel.findById(id).exec();
    doc.person = update.person;
    doc.date = update.date;
    doc.treatmentName = update.treatmentName;
    doc.time = { from: update.from, to: update.to };
    await doc.save();
    success = true;
  } catch (e) {
    console.error(e);
  }

  return success;
}

export async function deleteAppointment(id: string): Promise<boolean> {
  let success: boolean = false;

  try {
    const res = await AppointmentModel.deleteOne({ _id: id });
    success = res.deletedCount > 0;
  } catch (e) {
    console.error(e);
  }

  return success;
}

async function getAvailabilityByDate(date: Date): Promise<IAvailability> {
  const schedule = await getScheduleInUse(date);
  const scheduleForToday = schedule.availability.find(
    (a): boolean => a.day === format(date, "EEEE").toLowerCase()
  )!;

  return scheduleForToday;
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
