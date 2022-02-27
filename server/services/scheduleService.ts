import { add } from "date-fns";

const timetableModels = require("../models/schedule");

export async function getScheduleInUse(date: Date) {
  let defaultSchedule = new timetableModels.scheduleModel({
    name: "DefaultSchedule",
    starts: date,
    ends: add(date, { days: 7 }),
    availability: [
      new timetableModels.availabilityModel({
        day: "Sunday",
        times: [
          { from: "1:30PM", to: "2:00PM" },
          { from: "2:30PM", to: "3:00PM" },
          { from: "12:30PM", to: "1:00PM" },
          { from: "1:30AM", to: "2:00AM" },
        ],
      }),
      new timetableModels.availabilityModel({
        day: "Monday",
        times: [
          { from: "6:30PM", to: "7:00PM" },
          { from: "7:30PM", to: "8:00PM" },
          { from: "12:30AM", to: "1:00AM" },
          { from: "1:30AM", to: "2:00AM" },
        ],
      }),
    ],
  });

  return defaultSchedule;
}