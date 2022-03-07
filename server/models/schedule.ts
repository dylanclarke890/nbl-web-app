import * as mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    lowercase: true,
  },
  times: {
    type: [
      {
        from: {
          type: String,
          required: true,
          uppercase: true,
        },
        to: {
          type: String,
          required: true,
          uppercase: true,
        },
      },
    ],
  },
});

const scheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    default: "DefaultSchedule",
  },
  starts: {
    type: Date,
    required: true,
  },
  ends: {
    type: Date,
    required: true,
  },
  availability: { type: [availabilitySchema],
    validate: [hasSevenItems, 'Needs 7 days of availability.']
  },
});

function hasSevenItems(val: any[]) {
  return val.length === 7
}

module.exports = {
  scheduleModel: mongoose.model("Schedule", scheduleSchema),
  availabilityModel: mongoose.model("Availability", availabilitySchema),
};
