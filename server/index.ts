import express from "express";
let database = require("./services/database");
import cors from "cors";
import appointmentRouter from "./routes/appointment-routes";
import treatmentRouter from "./routes/treatment-routes";
import scheduleRouter from "./routes/schedule-routes";

const app = express();

app.use(cors());
app.use(express.json());

// Place Auth middleware here
app.use("/api/appointments", appointmentRouter);
app.use("/api/treatments", treatmentRouter);
app.use("/api/schedules", scheduleRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.info(`Server listening on ${PORT}`);
});
