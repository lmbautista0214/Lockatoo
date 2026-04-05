import express from "express";
import {
  createPayPalOrder,
  capturePayPalOrder,
  getDashboardStatsPayment
} from "../controllers/paymentController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-order", createPayPalOrder);
router.post("/capture-order", capturePayPalOrder);
router.get("/dashboard", requireAuth, getDashboardStatsPayment);

export default router;