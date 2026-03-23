import express from "express";
import dotEnv from "dotenv";
import { connectDB } from "./configs/configDB.js";

import authRoutes from "./routes/authRoutes.js";

dotEnv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes)



const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});