import axios from "axios";
import { sortByTimeStamp } from "../helpers/timeSort";
import IPerson from "../interfaces/IPerson";
import Appointment from "../models/appointment";
import Treatment from "../models/treatment";

const APIENDPOINT = "/api/appointments/";

export async function getAppointment(id: string): Promise<Appointment> {
  let res = await axios.get(`${APIENDPOINT}/${id}`);
  const data = res.data;

  return new Appointment(
    data?._id,
    data?.time.from,
    data?.time.to,
    {
      name: data?.person?.name,
      phone: data?.person?.phone,
      email: data?.person?.email,
    },
    data?.treatment,
    new Date(data?.date)
  );
}

export async function getAllAppointments(
  onSuccess: (data: Appointment[]) => void
) {
  let res = await axios.get(`${APIENDPOINT}all`);
  let appointments: Appointment[] = [];

  res.data.forEach(
    (el: {
      _id: string;
      time: { from: string; to: string };
      person: { name: string; phone: string; email: string };
      treatment: Treatment;
      date: string | number | Date;
    }) => {
      appointments.push(
        new Appointment(
          el?._id,
          el?.time.from,
          el?.time.to,
          {
            name: el?.person?.name,
            phone: el?.person?.phone,
            email: el?.person?.email,
          },
          el?.treatment,
          new Date(el?.date)
        )
      );
    }
  );
  onSuccess(appointments);
}

export async function addAppointment(
  appointment: Appointment,
  person: IPerson,
  date: Date,
  treatment: Treatment,
  onSuccess: (arg0: {
    message: string;
    reference: string;
    time: string;
  }) => void,
  sendConfirmation?: boolean
): Promise<void> {
  let res = await axios.post(`${APIENDPOINT}new/`, {
    time: { from: appointment.from, to: appointment.to },
    person,
    date,
    treatment,
    sendConfirmation,
  });
  let booking = res.data;
  const successInfo = {
    message: res.data.message,
    reference: booking._id,
    time: `${booking.time.from} - ${booking.time.to}`,
  };
  onSuccess(successInfo);
}

export async function addAdminAppointment(
  appointment: Appointment,
  person: IPerson,
  date: Date,
  treatment: Treatment,
  onSuccess: (arg0: {
    message: string;
    reference: string;
    time: string;
  }) => void,
  sendConfirmation?: boolean
): Promise<void> {
  let res = await axios.post(`${APIENDPOINT}new/admin`, {
    time: { from: appointment.from, to: appointment.to },
    person,
    date,
    treatment,
    sendConfirmation,
  });
  let booking = res.data;
  const successInfo = {
    message: res.data.message,
    reference: booking._id,
    time: `${booking.time.from} - ${booking.time.to}`,
  };
  onSuccess(successInfo);
}

export async function getAppointmentsByDay(
  day: Date,
  treatmentId: string
): Promise<[Appointment[], Treatment]> {
  if (!day) throw Error("Should have a date");
  const d = day.getDate();
  const m = day.getMonth();
  const y = day.getFullYear();
  let res: any;
  res = await axios.get(`${APIENDPOINT}${d}/${m}/${y}/${treatmentId}`);

  let times: Appointment[] = [];
  res.data.times.forEach((el: { day: Date; from: string; to: string }) =>
    times.push(new Appointment(res.data.times.indexOf(el), el.from, el.to))
  );

  const treatment = res.data.treatment;
  return [
    sortByTimeStamp(times),
    new Treatment(
      treatment._id,
      treatment.type,
      treatment.duration,
      treatment.price,
      treatment.isActive
    ),
  ];
}

export async function getMonthOverview(month: Date): Promise<number[]> {
  const y = month.getFullYear();
  const m = month.getMonth();

  let res: any;
  res = await axios.get(`${APIENDPOINT}overview/${y}/${m}`);
  return res.data;
}

export async function editAppointment(appointment: Appointment) {
  let res: boolean = false;

  res = await axios.put(`${APIENDPOINT}edit/${appointment.id}`, {
    appointment: appointment,
  });

  return res;
}

export async function cancelAppointment(id: string): Promise<boolean> {
  let res: boolean = false;
  res = await axios.delete(`${APIENDPOINT}cancel/${id}`);
  return res;
}
