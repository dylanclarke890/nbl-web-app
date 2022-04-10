import express from "express";
import favicon from "serve-favicon";
import path from "path";
let database = require("./services/database");

import reactFilesRequestHandler from "./middlewares/react-files-request-handler";
import { requestRateLimiter } from "./middlewares/request-rate-limiter";

import appointmentRouter from "./routes/appointment-routes";
import treatmentRouter from "./routes/treatment-routes";
import scheduleRouter from "./routes/schedule-routes";
import emailRouter from "./routes/email-routes";
import authRouter from "./routes/auth-routes";
import dashboardRouter from "./routes/dashboard-routes";

const app = express();

app.use(requestRateLimiter);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/treatments", treatmentRouter);
app.use("/api/schedules", scheduleRouter);
app.use("/api/contact", emailRouter);
app.use("/api/dashboard", dashboardRouter);

app.use(reactFilesRequestHandler);
app.use(favicon(path.join(__dirname, "../client/build/nbl-favicon.ico")));
app.use(express.static(path.join(__dirname, "../client/build")));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.info(`Server listening on ${PORT}`);
});
