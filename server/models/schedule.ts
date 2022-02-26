let mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    lowercase: true,
  },
  times: [
    {
      from: {
        type: String,
        required: true,
        lowercase: true,
      },
      to: {
        type: String,
        required: true,
        lowercase: true,
      },
    },
  ],
});

const scheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    default: "DefaultSchedule"
  },
  availabilty: [availabilitySchema],
});

module.exports = mongoose.model("Schedule", availabilitySchema);
