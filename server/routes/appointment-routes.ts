import express from "express";
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

appointmentRouter.get(
  "/:day/:month/:year/:appointmentTypeId",
  async (req, res) => {
    let result: { times: ITimeSlot[] };

    try {
      result = await getDailyAppointments(req);
    } catch {
      return res.status(500).send(`Internal error`);
    }

    return res.json(result);
  }
);

appointmentRouter.get("/all", async (req, res) => {
  let result: IAppointment[];

  try {
    result = await getAllAppointments();
  } catch {
    return res.status(500).send(`Internal error`);
  }

  return res.json(result);
});

appointmentRouter.get("/:id", async (req, res) => {
  let result: IAppointment;

  try {
    result = await getAppointment(req.params.id);
  } catch {
    return res.status(500).send(`Internal error`);
  }

  return res.json(result);
});

appointmentRouter.post("/new", async (req, res) => {
  let result!:
    | { message: string; appointment?: undefined }
    | { appointment: IAppointment; message?: undefined };

  try {
    result = await addAppointment(req);
  } catch {
    return res.status(500).send(`Internal error: ${result.message}`);
  }

  return res.json(result.appointment);
});

appointmentRouter.put("/edit/:id", async (req, res) => {
  let result: boolean = false;
  try {
    result = await editAppointment(req.params.id, req.body);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
});

appointmentRouter.delete("/cancel/:id", async (req, res) => {
  let result: boolean = false;

  try {
    result = await deleteAppointment(req.params.id);
  } catch {
    return res.status(500).send(`Internal error.`);
  }

  return res.json(result);
});

export default appointmentRouter;
