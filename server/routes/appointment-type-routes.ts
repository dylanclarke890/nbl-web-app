import express from "express";
import IAppointmentType from "../interfaces/IAppointmentType";
import {
  addAppointmentType,
  deleteAppointmentType,
  editAppointmentType,
  getAllAppointmentTypes,
  getAppointmentType,
} from "../services/appointment-type-service";

const appointmentTypeRouter = express.Router();

appointmentTypeRouter.get("/all/:isInActive?", async (req, res) => {
  let result: IAppointmentType[] = [];
  try {
    result = await getAllAppointmentTypes(req.params.isInActive != undefined);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
});

appointmentTypeRouter.get("/:id", async (req, res) => {
  let result: IAppointmentType | null = null;
  try {
    result = await getAppointmentType(req.params.id);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
});

appointmentTypeRouter.post("/new", async (req, res) => {
  let result: IAppointmentType | null = null;
  try {
    result = await addAppointmentType(req);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result!);
});

appointmentTypeRouter.put("/edit/:id", async (req, res) => {
  let result: boolean = false;
  try {
    result = await editAppointmentType(req.params.id, req.body);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
});

appointmentTypeRouter.delete("/delete/:id", async (req, res) => {
  let result: boolean = false;
  try {
    result = await deleteAppointmentType(req.params.id);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
});

export default appointmentTypeRouter;
