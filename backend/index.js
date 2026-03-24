import express from "express";
import dotEnv from "dotenv";
import { connectDB } from "./configs/configDB.js";

dotEnv.config();

const app = express();

connectDB();

app.use(express.json());

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});