import express from "express";

import {
  add,
  deleteById,
  getAll,
  getById,
  update,
} from "../controllers/schedule-controller";
import { accessTokenValidator } from "../middlewares/access-token-validator";

const scheduleRouter = express.Router();

scheduleRouter.get("/all/:includeExpired?", accessTokenValidator, getAll);
scheduleRouter.get("/:id", accessTokenValidator, getById);
scheduleRouter.post("/new", accessTokenValidator, add);
scheduleRouter.put("/edit/:id", accessTokenValidator, update);
scheduleRouter.delete("/delete/:id", accessTokenValidator, deleteById);

export default scheduleRouter;
