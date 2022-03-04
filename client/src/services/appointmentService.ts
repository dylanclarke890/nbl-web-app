import axios from "axios";
import { sortByTimeStamp } from "../helpers/timeSort";
import IPerson from "../interfaces/IPerson";
import Appointment from "../models/appointment";

const APIENDPOINT = "/api/appointments/";

export async function addAppointment(
  appointment: Appointment,
  person: IPerson,
  date: Date,
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
  onError: () => any
): Promise<Appointment[]> {
  if (!day) return [];

  let res: any;
  try {
    res = await axios.get(
      `${APIENDPOINT}${day.getDate()}/${day.getMonth()}/${day.getFullYear()}`
    );
  } catch (e) {
    onError();
    return [];
  }

  let times: Appointment[] = [];
  res.data.times.forEach((el: { day: Date; from: string; to: string }) =>
    times.push(new Appointment(res.data.times.indexOf(el), el.from, el.to))
  );
  return sortByTimeStamp(times);
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
