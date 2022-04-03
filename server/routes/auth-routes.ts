import express from "express";
import { login, register } from "../services/auth-service";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  let result: { id: string; name: string; email: string; };

  try {
    result = await login(req);
  } catch {
    return res.status(500).send(`Internal error`);
  }

  return res.json(result);
});

authRouter.post("/register", async (req, res) => {
  let result: string = "";

  try {
    result = await register(req);
  } catch {
    return res.status(500).send(`Internal error`);
  }

  return res.json(result);
});

export default authRouter;
