import express from "express";
import IAppointment from "../interfaces/IAppointment";
import ITimeSlot from "../interfaces/ITimeSlot";
import {
  addAppointment,
  getDailyAppointments,
  getMonthOverview,
} from "../services/appointment-service";

const appointmentRouter = express.Router();

appointmentRouter.get("/overview/:year/:month", async (req, res) => {
  let result: number[];
  try {
    result = await getMonthOverview(req);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
});

appointmentRouter.get("/:day/:month/:year", async (req, res) => {
  let result: { times: ITimeSlot[]; };
  try {
    result = await getDailyAppointments(req);
  }
  catch {
    return res.status(500).send(`Internal error`);
  } 
  return res.json(result);
});

appointmentRouter.post("/new", async (req, res) => {
  let result!: { message: string; appointment?: undefined; } | { appointment: IAppointment; message?: undefined; }; 
  try {
    result = await addAppointment(req);
  } catch {
    return res.status(500).send(`Internal error: ${result.message}`);
  }
  return res.json(result.appointment);
});

export default appointmentRouter;
