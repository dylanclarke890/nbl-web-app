let mongoose = require("mongoose");
let AppointmentModel = require("../models/appointment");

export async function addAppointment(req: any) {
  const data = req.body;

  if (await hasExistingAppointment(data.date, data.time.from)) {
    return { message: "Appointment already exists." };
  }

  let appointment = new AppointmentModel({
    person: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
    date: data.date,
    time: {
      from: data.time.from,
      to: data.time.to,
    },
    appointmentType: "nails",
  });

  try {
    await appointment.save();
  } catch (e) {
    console.error(e);
    return { message: "Error whilst saving." };
  }

  console.log(appointment);
  return { appointment };
}

export async function getAppointments(req: any) {
  const params = req.params;
  const day = new Date(
    parseInt(params.year),
    parseInt(params.month),
    parseInt(params.day)
  );

  let booked = await getExistingAppointments(day);
  console.log(booked);

  return { times };
}

async function getExistingAppointments(date: Date) {
  let existing = await AppointmentModel.find({ date: date });
  let existingTimes: { from: string; to: string }[] = [];
  existing.forEach((app: { time: { from: string; to: string } }) => {
    existingTimes.push(app.time);
  });

  return existingTimes;
}

async function hasExistingAppointment(
  date: Date,
  from: string
): Promise<boolean> {
  let res = (await AppointmentModel.where("date").equals(date).where("time.from").equals(from));
  return res.length !== 0;
}

const times = [
  { id: "1", from: "1:30pm", to: "2:30pm" },
  { id: "2", from: "1:30am", to: "2:30am" },
  { id: "3", from: "12:30pm", to: "13:30pm" },
  { id: "4", from: "12:30am", to: "1:30am" },
  { id: "5", from: "2:30pm", to: "3:30pm" },
  { id: "6", from: "2:30am", to: "3:30am" },
];
