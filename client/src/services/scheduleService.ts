import axios from "axios";

import Schedule from "../models/schedule";

const APIENDPOINT = "/api/schedules/";

export async function getAllSchedules(onSuccess: (data: Schedule[]) => void) {
  let res: any = {};
  res = await axios.get(`${APIENDPOINT}all/true`);
  let schedules: Schedule[] = [];

  res.data.forEach((el: Schedule) => {
    schedules.push(
      new Schedule(
        el._id,
        el.name,
        new Date(el.starts),
        el.availability,
        el.runsIndefinitely,
        el.ends !== undefined ? new Date(el.ends) : undefined
      )
    );
  });
  onSuccess(schedules);
}

export async function getSchedule(id: string): Promise<Schedule> {
  let res: any = {};
  res = await (await axios.get(`${APIENDPOINT}${id}`)).data;

  return new Schedule(
    res?.id,
    res?.name,
    new Date(res?.starts),
    res?.availability,
    res?.runsIndefinitely,
    new Date(res?.ends)
  );
}

export async function addSchedule(schedule: Schedule): Promise<any> {
  let res: any = {};
  res = await axios.post(`${APIENDPOINT}new`, { data: schedule });
  return res.data;
}

export async function editSchedule(schedule: Schedule): Promise<boolean> {
  let res: boolean = false;
  res = await axios.put(`${APIENDPOINT}edit/${schedule._id}`, {
    schedule: schedule,
  });
  return res;
}

export async function deleteSchedule(id: string): Promise<boolean> {
  let res: boolean = false;
  res = await axios.delete(`${APIENDPOINT}delete/${id}`);
  return res;
}
