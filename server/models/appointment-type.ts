let mongoose = require("mongoose");

let appointmentTypeSchema = new mongoose.Schema({
  appointmentType: {
    type: String,
    required: true,
    lowercase: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
});

module.exports = mongoose.model("AppointmentType", appointmentTypeSchema);
