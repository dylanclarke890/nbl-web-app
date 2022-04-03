import express from "express";

import { customerQuery } from "../controllers/email-controller";

const emailRouter = express.Router();

emailRouter.post("/", customerQuery);

export default emailRouter;
