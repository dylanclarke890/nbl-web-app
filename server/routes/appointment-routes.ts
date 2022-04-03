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

const appointmentRouter = express.Router();

appointmentRouter.get("/overview/:year/:month", getOverview);
appointmentRouter.get("/:day/:month/:year/:treatmentId", getDaily);
appointmentRouter.get("/all", getAll);
appointmentRouter.get("/:id", getById);
appointmentRouter.post("/new", add);
appointmentRouter.put("/edit/:id", update);
appointmentRouter.delete("/cancel/:id", deleteById);

export default appointmentRouter;
