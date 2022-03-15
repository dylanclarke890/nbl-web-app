let mongoose = require("mongoose");
let AppointmentModel = require("../models/appointment");
import { format, getDaysInMonth } from "date-fns";
import ITimeSlot from "../interfaces/ITimeSlot";
import IAppointment from "../interfaces/IAppointment";
import { getScheduleInUse } from "./schedule-service";
import { getAvailableTimeSlots } from "./time-service";
import IAvailability from "../interfaces/IAvailability";
import { getAppointmentType } from "./appointment-type-service";

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

async function getAvailabilityByDate(date: Date): Promise<IAvailability> {
  const schedule = await getScheduleInUse(date);
  const scheduleForToday = schedule.availability.find(
    (a): boolean => a.day === format(date, "EEEE").toLowerCase()
  )!;

  return scheduleForToday;
}

export async function getAppointment(id: string): Promise<IAppointment> {
  return await AppointmentModel.findById(id).exec();
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

  const appointmentType = await getAppointmentType(params.appointmentTypeId);
  if (appointmentType.appointmentType === "") throw new Error("Should've had a value for appointment type.");

  const existingAppointments = await getExistingAppointments(day);

  const scheduleForToday = await getAvailabilityByDate(day);
  const availableTimeSlots = getAvailableTimeSlots(
    scheduleForToday!.times,
    appointmentType.duration,
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

    const scheduleForToday = await getAvailabilityByDate(currDate);

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

export async function deleteAppointment(id: string) : Promise<boolean> {
  let success: boolean = false;

  try {
    const res = await AppointmentModel.deleteOne({ _id: id });
    success = res.deletedCount > 0;
  } catch (e) {
    console.error(e);
  }

  return success;
}
