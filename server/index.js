const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

const times = [
  { from: "1:30pm", to: "2:30pm" },
  { from: "1:30am", to: "2:30am" },
  { from: "12:30pm", to: "13:30pm" },
  { from: "12:30am", to: "1:30am" },
  { from: "2:30pm", to: "3:30pm" },
  { from: "2:30am", to: "3:30am" },
];

app.get("/api/appointments", (req, res) => {
  res.json({ times });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
