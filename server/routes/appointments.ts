import express from "express";
import * as Validation from "../validation";

const appointmentRouter = express.Router();

const times = [
  { id: "1", from: "1:30pm", to: "2:30pm" },
  { id: "2", from: "1:30am", to: "2:30am" },
  { id: "3", from: "12:30pm", to: "13:30pm" },
  { id: "4", from: "12:30am", to: "1:30am" },
  { id: "5", from: "2:30pm", to: "3:30pm" },
  { id: "6", from: "2:30am", to: "3:30am" },
];

appointmentRouter.get("/", (req, res) => {
  res.json({ times });
});

appointmentRouter.post("/new", (req, res) => {
  const data = req.body;
  if (!data.id || !data.name || !data.email || !data.phone) {
    res.status(500).send({ message: "Invalid input." });
  }

  if (
    !Validation.validateField(data.name, 3, 30) ||
    !Validation.validateEmail(data.email) ||
    !Validation.validatePhone(data.phone)
  ) {
    res.status(500).send({ message: "Invalid input." });
  }

  res.json({ reference: "123Success", message: "Success" });
});

export default appointmentRouter;