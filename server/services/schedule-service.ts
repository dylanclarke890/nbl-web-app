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

  _loadedSchedule = await getSchedule(date);
  return _loadedSchedule;
}

async function getSchedule(date: Date): Promise<ISchedule> {
  let defaultSchedule = new timetableModels.scheduleModel({
    name: "DefaultSchedule",
    starts: date,
    ends: add(date, { months: 2 }),
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
  });

  return defaultSchedule;
}
