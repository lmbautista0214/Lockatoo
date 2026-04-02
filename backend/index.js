import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/configDB.js";
import sendEmailRoute from "./routes/sendEmailRoute.js";
import pricingRoute from "./routes/pricingRoute.js";
import authRoutes from "./routes/authRoutes.js";
import lockerRoutes from "./routes/lockerRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";

dotEnv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: `http://localhost:5173`,
  credentials: true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/lockers", lockerRoutes);
app.use("/w1/api/booking/email", sendEmailRoute);
app.use("/api/user", userRoutes)
app.use("/w1/api/admin/pricing", pricingRoute);

// error handler (always last)
app.use(errorHandler);

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});