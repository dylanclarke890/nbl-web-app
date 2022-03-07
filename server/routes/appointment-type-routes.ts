import express from "express";
import IAppointmentType from "../interfaces/IAppointmentType";
import { addAppointmentType, getAppointmentTypes } from "../services/appointment-type-service";

const appointmentTypeRouter = express.Router();

appointmentTypeRouter.get("/all", async (req, res) => {
  let result: IAppointmentType[] = [];
  try {
    result = await getAppointmentTypes();
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
});

appointmentTypeRouter.post("/new", async (req, res) => {
  let result: IAppointmentType;
  try {
    result = await addAppointmentType(req);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result!);
});

export default appointmentTypeRouter;
