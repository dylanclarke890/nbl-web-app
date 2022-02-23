import express from "express";
import { addAppointment, getAppointments } from "../services/appointmentService";

const appointmentRouter = express.Router();

appointmentRouter.get("/:day/:month/:year", (req, res,) => {
  const result = getAppointments(req);
  if (!result) {
    return res.status(500).send('internal error');
  }
  res.json(result);
});

appointmentRouter.post("/new", (req, res) => {
  const result = addAppointment(req);
  if (!result.appointment?.id) {
    return res.status(500).send(result.message);
  }
  res.json(result);
});

export default appointmentRouter;