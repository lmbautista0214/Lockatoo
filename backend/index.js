import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/configDB.js";
import sendEmailRoute from "./routes/sendEmailRoute.js";

import authRoutes from "./routes/authRoutes.js";

dotEnv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(cors());

//route
app.use("/w1/api/booking/email-confirmation", sendEmailRoute);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});