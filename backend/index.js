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
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotEnv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: ["https://lockatoo-1.onrender.com", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/lockers", lockerRoutes);
app.use("/api/booking/email", sendEmailRoute);
app.use("/api/user", userRoutes);
app.use("/api/admin/pricing", pricingRoute);
app.use("/api/booking", bookingRoutes);
app.use("/api/payment", paymentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
