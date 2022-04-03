import express from "express";
import cors from "cors";
let database = require("./services/database");

import appointmentRouter from "./routes/appointment-routes";
import treatmentRouter from "./routes/treatment-routes";
import scheduleRouter from "./routes/schedule-routes";
import emailRouter from './routes/email-routes';
import authRouter from './routes/auth-routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/treatments", treatmentRouter);
app.use("/api/schedules", scheduleRouter);
app.use("/api/contact", emailRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.info(`Server listening on ${PORT}`);
});
