let mongoose = require("mongoose");
import { format, getDaysInMonth } from "date-fns";

import ITimeSlot from "../interfaces/ITimeSlot";
import IAppointment from "../interfaces/IAppointment";
import IAvailability from "../interfaces/IAvailability";
let AppointmentModel = require("../models/appointment");

import { getAvailableTimeSlots } from "./time-service";
import { getScheduleInUse } from "./schedule-service";
import { getTreatment } from "./treatment-service";
import ITreatment from "../interfaces/ITreatment";
import { sendAppointmentConfirmation } from "./email/email-service";

export async function addAppointment(req: any): Promise<IAppointment> {
  const data = req.body;
  if (await hasExistingAppointment(data.date, data.time.from)) {
    throw Error("Conflicting time slot");
  }

  let appointment = new AppointmentModel({
    person: { ...data.person },
    date: data.date,
    time: { ...data.time },
    treatment: data.treatment,
  });
  await appointment.save();

  if (data.sendConfirmation) {
    await sendAppointmentConfirmation(appointment);
  }

  return appointment;
}

export async function getAppointment(id: string): Promise<IAppointment> {
  return await AppointmentModel.findById(id).exec();
}

export async function getAllAppointments() {
  return await AppointmentModel.find();
}

export async function getDailyAppointments(
  req: any
): Promise<{ times: ITimeSlot[]; treatment: ITreatment }> {
  const params = req.params;
  const day = new Date(
    parseInt(params.year),
    parseInt(params.month),
    parseInt(params.day)
  );

  const treatment = await getTreatment(params.treatmentId);
  if (treatment._id === "")
    throw new Error("Should've had a value for treatment.");

  const existingAppointments = await getExistingAppointments(day);

  const scheduleForToday = await getAvailabilityByDate(day);
  const times = getAvailableTimeSlots(
    scheduleForToday!.times,
    treatment.duration,
    existingAppointments
  );

  return { times, treatment };
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
