import express from "express";

import {
  add,
  deleteById,
  getAll,
  getById,
  update,
} from "../controllers/schedule-controller";

const scheduleRouter = express.Router();

scheduleRouter.get("/all/:includeExpired?", getAll);
scheduleRouter.get("/:id", getById);
scheduleRouter.post("/new", add);
scheduleRouter.put("/edit/:id", update);
scheduleRouter.delete("/delete/:id", deleteById);

export default scheduleRouter;
