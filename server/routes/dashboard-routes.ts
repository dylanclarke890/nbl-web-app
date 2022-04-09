import express from "express";
import { dashboard } from "../controllers/dashboard-controller";

const dashboardRouter = express.Router();

dashboardRouter.get("/", dashboard);

export default dashboardRouter;
