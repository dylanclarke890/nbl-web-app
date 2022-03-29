import axios from "axios";
import { sortByTimeStamp } from "../helpers/timeSort";
import IPerson from "../interfaces/IPerson";
import Appointment from "../models/appointment";
import Treatment from "../models/treatment";

const APIENDPOINT = "/api/appointments/";

export async function getAppointment(
  id: string,
  onError: (err: any) => void
): Promise<Appointment> {
  let res: any;

  try {
    res = await axios.get(`${APIENDPOINT}/${id}`);
  } catch (err) {
    onError(err);
  }

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
  onSuccess: (data: Appointment[]) => void,
  onError: (arg0: any) => void
) {
  let res: any = {};
  try {
    res = await axios.get(`${APIENDPOINT}all`);
  } catch (err) {
    onError(err);
  }

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
  onError: (err: any) => void
): Promise<void> {
  let res: any;

  try {
    res = await axios.post(`${APIENDPOINT}new/`, {
      time: { from: appointment.from, to: appointment.to },
      person,
      date,
      treatment,
    });
  } catch (err) {
    onError(err);
  }
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
  treatmentId: string): Promise<[Appointment[], Treatment]> {
  if (!day) throw Error("Should have a date");

  const d = day.getDay();
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

export async function getMonthOverview(
  month: Date,
  onError: (arg0: any) => void
): Promise<number[]> {
  let res: any;
  try {
    res = await axios.get(
      `${APIENDPOINT}overview/${month.getFullYear()}/${month.getMonth()}`
    );
  } catch (err) {
    onError(err);
    return [];
  }
  return res.data;
}

export async function editAppointment(
  appointment: Appointment,
  onError: (arg0: any) => void
) {
  let res: boolean = false;

  try {
    res = await axios.put(`${APIENDPOINT}edit/${appointment.id}`, {
      appointment: appointment,
    });
  } catch (err) {
    onError(err);
  }

  return res;
}

export async function cancelAppointment(
  id: string,
  onError: (err: any) => void
): Promise<boolean> {
  let res: boolean = false;

  try {
    res = await axios.delete(`${APIENDPOINT}cancel/${id}`);
  } catch (err) {
    onError(err);
  }

  return res;
}
