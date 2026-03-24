import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/configDB.js";
import sendEmailRoute from "./routes/sendEmailRoute.js";

dotEnv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

//route
app.use("/w1/api/booking/email-confirmation", sendEmailRoute);

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});