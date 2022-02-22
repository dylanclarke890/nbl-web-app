import express from "express";
import cors from "cors";
import appointmentRouter from "./routes/appointments";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/appointments', appointmentRouter);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
