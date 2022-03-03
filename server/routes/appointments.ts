import express from "express";
import { addAppointment, getDailyAppointments, getMonthOverview } from "../services/appointmentService";

const appointmentRouter = express.Router();

appointmentRouter.get("/overview/:year/:month", async (req, res,) => {
  const result = await getMonthOverview(req);
  if (!result) {
    return res.status(500).send(`Internal error`);
  }
  return res.json([...result.entries()]);
});

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