import * as mongoose from "mongoose";
import * as Validation from "../helpers/validation";

let appointmentSchema = new mongoose.Schema({
  person: {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => Validation.validateEmail(v),
        message: (props: { value: string }) =>
          `${props.value} is not a valid email.`,
      },
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => Validation.validatePhone(v),
        message: (props: { value: string }) =>
          `${props.value} is not a valid phone number.`,
      },
    },
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    from: {
      type: String,
      required: true,
      uppercase: true
    },
    to: {
      type: String,
      required: true,
      uppercase: true
    },
  },
  appointmentType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
