import * as mongoose from "mongoose";
import { add } from "date-fns";

import ISchedule from "../interfaces/ISchedule";
import IAvailability from "../interfaces/IAvailability";
const timetableModels = require("../models/schedule");

let _loadedSchedule: ISchedule = {
  _id: "",
  name: "",
  starts: add(new Date(), { days: -2 }),
  runsIndefinitely: false,
  availability: [],
};
export async function getScheduleInUse(date: Date): Promise<ISchedule> {
  if (
    _loadedSchedule.starts <= date &&
    (_loadedSchedule.runsIndefinitely ||
      (_loadedSchedule.ends !== undefined && _loadedSchedule.ends! > date))
  ) {
    console.log("Returning previously loaded.");
    return _loadedSchedule;
  }

  const loaded: any[] = await timetableModels.scheduleModel
    .where("starts")
    .gt(date)
    .exec();

  switch (loaded.length) {
    case 0:
      console.log("No schedule found.");
      _loadedSchedule = anEmptySchedule;
      break;
    case 1:
      console.log("One result found.");
      _loadedSchedule = loaded[0];
      break;
    default: { // more than possible schedule
      console.log("Multiple results found.")
      const scheduleWithEnd = loaded.find(s => !s.runsIndefinitely);
      console.log(scheduleWithEnd ? "Found schedule with expiry." : "Returning first result.");
      // if no match found then just return the first result from the list
      _loadedSchedule = scheduleWithEnd === undefined ? loaded[0] : scheduleWithEnd;
    }
    break;
  }

  return _loadedSchedule;
}

export async function getSchedule(id: string): Promise<ISchedule> {
  return await timetableModels.scheduleModel.findById(id).exec();
}

export async function getAllSchedules(
  includeExpired: boolean
): Promise<ISchedule[]> {
  return await timetableModels.scheduleModel.find().exec();
}

export async function addSchedule(req: any) {
  let item: ISchedule = req.body.data;
  item.availability = addMissingDays(item.availability);
  let result = new timetableModels.scheduleModel({ ...item });
  try {
    await result.save();
  } catch (e) {
    console.error(e);
  }

  return result;
}

export async function editSchedule(id: string, item: any) {
  let success = false;
  const update: ISchedule = item.schedule;
  update.availability = addMissingDays(update.availability);
  try {
    const doc = await timetableModels.scheduleModel.findById(id).exec();

    doc.name = update.name;
    doc.starts = update.starts;
    doc.availability = update.availability;
    doc.runsIndefinitely = update.runsIndefinitely;
    doc.ends = update.ends;

    doc.save();
    success = true;
  } catch (e) {
    console.error(e);
  }

  return success;
}

export async function deleteSchedule(id: string) {
  let success = false;

  try {
    const res = await timetableModels.scheduleModel.deleteOne({ _id: id });
    success = res.deletedCount > 0;
  } catch (e) {
    console.error(e);
  }

  return success;
}

function addMissingDays(availability: IAvailability[]) {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  days.forEach((d) => {
    if (availability.find((a) => a.day === d) === undefined) {
      availability.push({ day: d, times: [] });
    }
  });

  return availability;
}

const anEmptySchedule = {
  _id: "",
  name: "",
  starts: new Date(),
  ends: undefined,
  runsIndefinitely: true,
  availability: [
    { day: "sunday", times: [] },
    { day: "monday", times: [] },
    { day: "tuesday", times: [] },
    { day: "wednesday", times: [] },
    { day: "thursday", times: [] },
    { day: "friday", times: [] },
    { day: "saturday", times: [] },
  ],
};
