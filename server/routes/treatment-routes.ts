import express from "express";

import {
  add,
  deleteById,
  getAll,
  getAllAdmin,
  getById,
  update,
} from "../controllers/treatment-controller";
import { accessTokenValidator } from "../middlewares/access-token-validator";

const treatmentRouter = express.Router();

treatmentRouter.get("/all/admin", accessTokenValidator, getAllAdmin);
treatmentRouter.get("/all", getAll);
treatmentRouter.get("/:id", accessTokenValidator, getById);
treatmentRouter.post("/new", accessTokenValidator, add);
treatmentRouter.put("/edit/:id", accessTokenValidator, update);
treatmentRouter.delete("/delete/:id", accessTokenValidator, deleteById);

export default treatmentRouter;
