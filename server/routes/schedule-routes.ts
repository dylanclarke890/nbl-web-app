import express from "express";

import ISchedule from "../interfaces/ISchedule";
import {
  addSchedule,
  deleteSchedule,
  editSchedule,
  getAllSchedules,
  getSchedule,
} from "../services/schedule-service";

const scheduleRouter = express.Router();

scheduleRouter.get("/all/:includeExpired?", async (req, res) => {
  let result: ISchedule[] = [];
  try {
    result = await getAllSchedules(req.params.includeExpired != undefined);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
});

scheduleRouter.get("/:id", async (req, res) => {
  let result: ISchedule | null = null;
  try {
    result = await getSchedule(req.params.id);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
});

scheduleRouter.post("/new", async (req, res) => {
  let result: ISchedule | null = null;
  try {
    result = await addSchedule(req);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result!);
});

scheduleRouter.put("/edit/:id", async (req, res) => {
  let result: boolean = false;
  try {
    result = await editSchedule(req.params.id, req.body);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
});

scheduleRouter.delete("/delete/:id", async (req, res) => {
  let result: boolean = false;
  try {
    result = await deleteSchedule(req.params.id);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
});

export default scheduleRouter;
