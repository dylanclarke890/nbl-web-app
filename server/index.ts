import express from "express";
import cors from "cors";
import * as Validation from "./validation";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

const times = [
  { id: "1", from: "1:30pm", to: "2:30pm" },
  { id: "2", from: "1:30am", to: "2:30am" },
  { id: "3", from: "12:30pm", to: "13:30pm" },
  { id: "4", from: "12:30am", to: "1:30am" },
  { id: "5", from: "2:30pm", to: "3:30pm" },
  { id: "6", from: "2:30am", to: "3:30am" },
];

app.use(express.json());

app.get("/api/appointments", (req, res) => {
  res.json({ times });
});

app.post("/api/appointments/new", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
