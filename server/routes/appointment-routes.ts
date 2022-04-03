import express from "express";
import {
  getById,
  getAll,
  getDaily,
  getOverview,
  add,
  update,
  deleteById,
} from "../controllers/appointment-controller";
import { accessTokenValidator } from "../middlewares/access-token-validator";

const appointmentRouter = express.Router();

appointmentRouter.get("/overview/:year/:month", getOverview);
appointmentRouter.get("/:day/:month/:year/:treatmentId", getDaily);
appointmentRouter.get("/all", accessTokenValidator, getAll);
appointmentRouter.get("/:id", accessTokenValidator, getById);
appointmentRouter.post("/new", accessTokenValidator, add);
appointmentRouter.put("/edit/:id", accessTokenValidator, update);
appointmentRouter.delete("/cancel/:id", accessTokenValidator, deleteById);

export default appointmentRouter;
