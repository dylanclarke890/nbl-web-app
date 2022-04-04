import ITreatment from "../interfaces/ITreatment";
import {
  addTreatment,
  deleteTreatment,
  editTreatment,
  getAllTreatments,
  getTreatment,
} from "../services/treatment-service";

export async function getAll(req: any, res: any) {
  let result: ITreatment[];
  try {
    result = await getAllTreatments(false);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
}

export async function getAllAdmin(req: any, res: any) {
  let result: ITreatment[];
  try {
    result = await getAllTreatments(true);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
}

export async function add(req: any, res: any) {
  let result: ITreatment;
  try {
    result = await addTreatment(req);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result!);
}

export async function getById(req: any, res: any) {
  let result: ITreatment;
  try {
    result = await getTreatment(req.params.id);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
}

export async function update(req: any, res: any) {
  let result: boolean;
  try {
    result = await editTreatment(req.params.id, req.body);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
}

export async function deleteById(req: any, res: any) {
  let result: boolean;
  try {
    result = await deleteTreatment(req.params.id);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
}
