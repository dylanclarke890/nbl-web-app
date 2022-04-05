import express from "express";
let database = require("./services/database");

import appointmentRouter from "./routes/appointment-routes";
import treatmentRouter from "./routes/treatment-routes";
import scheduleRouter from "./routes/schedule-routes";
import emailRouter from "./routes/email-routes";
import authRouter from "./routes/auth-routes";

const app = express();
import path from "path";

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/treatments", treatmentRouter);
app.use("/api/schedules", scheduleRouter);
app.use("/api/contact", emailRouter);

app.use((req: any, res: any, next: any) => {
  if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
    next();
  } else {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  }
});
app.use(express.static(path.join(__dirname, "../client/build")));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.info(`Server listening on ${PORT}`);
});
