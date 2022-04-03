import ISchedule from "../interfaces/ISchedule";
import {
  addSchedule,
  deleteSchedule,
  editSchedule,
  getAllSchedules,
  getSchedule,
} from "../services/schedule-service";

export async function getAll(req: any, res: any) {
  let result: ISchedule[];
  try {
    result = await getAllSchedules(req.params.includeExpired !== undefined);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
}

export async function getById(req: any, res: any) {
  let result: ISchedule;
  try {
    result = await getSchedule(req.params.id);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
}

export async function add(req: any, res: any) {
  let result: ISchedule;
  try {
    result = await addSchedule(req);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result!);
}

export async function update(req: any, res: any) {
  let result: boolean;
  try {
    result = await editSchedule(req.params.id, req.body);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
}

export async function deleteById(req: any, res: any) {
  let result: boolean;
  try {
    result = await deleteSchedule(req.params.id);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
}
