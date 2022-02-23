let mongoose = require('mongoose')

let appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  appointmentType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);