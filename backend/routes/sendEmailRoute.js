import express from "express";
import { sendBookingEmail } from "../controllers/sendEmailController.js";

const router = express.Router();

router.post("/", sendBookingEmail);

export default router;