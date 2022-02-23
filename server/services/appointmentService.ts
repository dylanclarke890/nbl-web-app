let mongoose = require("mongoose");
let AppointmentModel = require("../models/appointment");

import * as Validation from "../validation";

const isInputValid = (data: { name: string; email: string; phone: string }) => {
  return (
    !Validation.validateField(data.name, 3, 30) ||
    !Validation.validateEmail(data.email) ||
    !Validation.validatePhone(data.phone)
  );
};

export function addAppointment(req: any) {
  const data = req.body;
  if (!data.name || !data.email || !data.phone || !data.from || !data.to) {
    return { message: "Need all inputs." };
  }
  if (isInputValid(data)) {
    return { message: "Invalid input." };
  }

  let appointment = new AppointmentModel({
    name: data.name,
    email: data.email,
    phone: data.phone,
    from: data.from,
    to: data.to,
    appointmentType: "nails"
  });

  appointment
    .save()
    .then((doc: any) => console.log(doc))
    .catch((err: any) => console.error(err));

  return { reference: "123Success", appointment };
}

export function getAppointments(req: any) {
  const params = req.params;
  const day = new Date(
    parseInt(params.year),
    parseInt(params.month),
    parseInt(params.day)
  );
  return { times };
}

const times = [
  { id: "1", from: "1:30pm", to: "2:30pm" },
  { id: "2", from: "1:30am", to: "2:30am" },
  { id: "3", from: "12:30pm", to: "13:30pm" },
  { id: "4", from: "12:30am", to: "1:30am" },
  { id: "5", from: "2:30pm", to: "3:30pm" },
  { id: "6", from: "2:30am", to: "3:30am" },
];
