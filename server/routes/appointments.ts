import express from "express";
import { addAppointment, getDailyAppointments } from "../services/appointmentService";

const appointmentRouter = express.Router();

appointmentRouter.get("/:day/:month/:year", async (req, res,) => {
  const result = await getDailyAppointments(req);
  if (!result) {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
});

appointmentRouter.post("/new", async (req, res) => {
  const result = await addAppointment(req);
  if (!result.appointment?._id) {
    return res.status(500).send(`Internal error: ${result.message}`);
  }
  return res.json(result.appointment);
});

export default appointmentRouter;