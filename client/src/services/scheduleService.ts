import axios from "axios";

import Availability from "../models/availability";
import Schedule from "../models/schedule";

const APIENDPOINT = "/api/schedules/";

export async function getAllSchedules(
  onSuccess: (data: Schedule[]) => void,
  onError: (arg0: any) => void
) {
  let res: any = {};
  try {
    res = await axios.get(`${APIENDPOINT}all/true`);
  } catch (err) {
    onError(err);
  }

  let schedules: Schedule[] = [];

  res.data.forEach(
    (el: {
      _id: string;
      name: string;
      starts: any;
      availability: Availability[];
      ends: any;
    }) => {
      schedules.push(
        new Schedule(el._id, el.name, new Date(el.starts), el.availability, new Date(el.ends))
      );
    }
  );
  onSuccess(schedules);
}

export async function getSchedule(id: string, onError: (arg0: any) => void) {
  let res: any = {};

  try {
    res = await axios.get(`${APIENDPOINT}${id}`);
  } catch (err) {
    onError(err);
  }
  let data = res.data;
  return new Schedule(
    data?.id,
    data?.name,
    new Date(data?.starts),
    data?.availability,
    new Date(data?.ends)
  );
}

export async function addSchedule(
  schedule: Schedule,
  onError: (arg0: any) => void
) {
  let res: any = {};
  try {
    res = await axios.post(`${APIENDPOINT}new`, { data: schedule });
  } catch (err) {
    onError(err);
  }

  return res.data;
}

export async function editSchedule(
  schedule: Schedule,
  onError: (arg0: any) => void
) {
  let res: boolean = false;

  try {
    res = await axios.put(`${APIENDPOINT}edit/${schedule._id}`, {
      schedule: schedule,
    });
  } catch (err) {
    onError(err);
  }

  return res;
}

export async function deleteSchedule(id: string, onError: (arg0: any) => void) {
  let res: boolean = false;
  try {
    res = await axios.delete(`${APIENDPOINT}delete/${id}`);
  } catch (err) {
    onError(err);
  }

  return res;
}
