import IAppointment from "../interfaces/IAppointment";
import ITimeSlot from "../interfaces/ITimeSlot";
import {
  addAppointment,
  deleteAppointment,
  editAppointment,
  getAllAppointments,
  getAppointment,
  getDailyAppointments,
  getMonthOverview,
} from "../services/appointment-service";

export async function getOverview(req: any, res: any) {
  let result: number[];
  try {
    result = await getMonthOverview(req);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
}

export async function getDaily(req: any, res: any) {
  let result: { times: ITimeSlot[] };
  try {
    result = await getDailyAppointments(req);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
}

export async function getAll(req: any, res: any) {
  let result: IAppointment[];
  try {
    result = await getAllAppointments();
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
}

export async function getById(req: any, res: any) {
  let result: IAppointment;
  try {
    result = await getAppointment(req.params.id);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
}

export async function add(req: any, res: any) {
  let result: IAppointment;
  try {
    result = await addAppointment(req);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
}

export async function update(req: any, res: any) {
  let result: boolean;
  try {
    result = await editAppointment(req.params.id, req.body);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
}

export async function deleteById(req: any, res: any) {
  let result: boolean;
  try {
    result = await deleteAppointment(req.params.id);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
}
