import express from "express";

import {
  add,
  deleteById,
  getAll,
  getById,
  update,
} from "../controllers/treatment-controller";

const treatmentRouter = express.Router();

treatmentRouter.get("/all/:includeInActive?", getAll);
treatmentRouter.get("/:id", getById);
treatmentRouter.post("/new", add);
treatmentRouter.put("/edit/:id", update);
treatmentRouter.delete("/delete/:id", deleteById);

export default treatmentRouter;
