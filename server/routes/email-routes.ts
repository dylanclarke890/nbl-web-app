import express from "express";

import { sendCustomerQuery } from "../services/email/email-service";

const emailRouter = express.Router();

emailRouter.post("/", async (req, res) => {
  let result: boolean = false;
  try {
    result = await sendCustomerQuery(req.body.contactDetails);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
});

export default emailRouter;
