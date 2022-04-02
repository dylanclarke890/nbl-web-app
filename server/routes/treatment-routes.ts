import express from "express";
import ITreatment from "../interfaces/ITreatment";
import {
  addTreatment,
  deleteTreatment,
  editTreatment,
  getAllTreatments,
  getTreatment,
} from "../services/treatment-service";

const treatmentRouter = express.Router();

treatmentRouter.get("/all/:includeInActive?", async (req, res) => {
  let result: ITreatment[] = [];
  try {
    result = await getAllTreatments(req.params.includeInActive === "true");
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
});

treatmentRouter.get("/:id", async (req, res) => {
  let result: ITreatment | null = null;
  try {
    result = await getTreatment(req.params.id);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
});

treatmentRouter.post("/new", async (req, res) => {
  let result: ITreatment | null = null;
  try {
    result = await addTreatment(req);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result!);
});

treatmentRouter.put("/edit/:id", async (req, res) => {
  let result: boolean = false;
  try {
    result = await editTreatment(req.params.id, req.body);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
});

treatmentRouter.delete("/delete/:id", async (req, res) => {
  let result: boolean = false;
  try {
    result = await deleteTreatment(req.params.id);
  } catch {
    return res.status(500).send(`Internal error.`);
  }
  return res.json(result);
});

export default treatmentRouter;
