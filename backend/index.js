import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/configDB.js";
import sendEmailRoute from "./routes/sendEmailRoute.js";

import authRoutes from "./routes/authRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotEnv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

//route
app.use("/api/auth", authRoutes);
app.use("/api/auth/locations", locationRoutes);
app.use("/w1/api/booking/email-confirmation", sendEmailRoute);

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
