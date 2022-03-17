import * as mongoose from "mongoose";
import { add } from "date-fns";

import ISchedule from "../interfaces/ISchedule";
const timetableModels = require("../models/schedule");

let _loadedSchedule: ISchedule | null = null;
export async function getScheduleInUse(date: Date): Promise<ISchedule> {
  if (
    _loadedSchedule &&
    _loadedSchedule.starts <= date &&
    _loadedSchedule.ends >= date
  ) {
    return _loadedSchedule;
  }

  _loadedSchedule = schedules[0];
  return _loadedSchedule;
}

export async function getSchedule(id: string): Promise<ISchedule> {
  return await timetableModels.scheduleModel.findById(id).exec();
}

export async function getAllSchedules(includeExpired: boolean) : Promise<ISchedule[]> {
  return await timetableModels.scheduleModel.find().exec();
}

export async function addSchedule(req: any){
  let result = new timetableModels.scheduleModel({ ...req.body.data });
  try {
    await result.save();
  } catch (e) {
    console.error(e);
  }

  return result;
}

export async function editSchedule(id: string, item: any){
  let success = false;
  const update = item.schedule;
  console.log(item);
  try {
    const doc = await timetableModels.scheduleModel.findById(id).exec();
    success = true;
  } catch (e) {
    console.error(e);
  }

  return success;
}

export async function deleteSchedule(id: string){
  let success = false;

  try {
    const res = await timetableModels.scheduleModel.deleteOne({ _id: id });
    success = res.deletedCount > 0;
  } catch (e) {
    console.error(e);
  }

  return success;
}

const schedules = [{
  _id: "622947628600793f62ba5550",
  name: "DefaultSchedule",
  starts: new Date(),
  ends: add(new Date(), { months: 2 }),
  availability: [
    new timetableModels.availabilityModel({
      day: "Sunday",
      times: [
        { from: "9:00 AM", to: "5:00 PM" },
        { from: "5:30 PM", to: "8:00 PM" },
        { from: "8:30 PM", to: "10:00 PM" },
        { from: "10:30 PM", to: "11:30 PM" },
      ],
    }),
    new timetableModels.availabilityModel({
      day: "Monday",
      times: [
        { from: "6:30 AM", to: "12:00 PM" },
        { from: "8:30 PM", to: "11:30 PM" },
        { from: "12:30 PM", to: "8:00 PM" },
      ],
    }),
    new timetableModels.availabilityModel({
      day: "Tuesday",
      times: [
        { from: "6:30 AM", to: "12:00 PM" },
        { from: "8:30 PM", to: "11:30 PM" },
        { from: "12:30 PM", to: "8:00 PM" },
      ],
    }),
    new timetableModels.availabilityModel({
      day: "Wednesday",
      times: [
        { from: "6:30 AM", to: "12:00 PM" },
        { from: "8:30 PM", to: "11:30 PM" },
        { from: "12:30 PM", to: "8:00 PM" },
      ],
    }),
    new timetableModels.availabilityModel({
      day: "Thursday",
      times: [],
    }),
    new timetableModels.availabilityModel({
      day: "Friday",
      times: [
        { from: "6:30 AM", to: "12:00 PM" },
        { from: "8:30 PM", to: "11:30 PM" },
        { from: "12:30 PM", to: "8:00 PM" },
      ],
    }),
    new timetableModels.availabilityModel({
      day: "Saturday",
      times: [
        { from: "6:30 AM", to: "12:00 PM" },
        { from: "8:30 PM", to: "11:30 PM" },
        { from: "12:30 PM", to: "8:00 PM" },
      ],
    }),
  ],
}];
