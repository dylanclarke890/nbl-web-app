import express from "express";
let database = require('./services/database');
import cors from "cors";
import appointmentRouter from "./routes/appointments";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/appointments', appointmentRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
