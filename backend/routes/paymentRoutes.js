import express from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import {
  createPayPalOrder,
  capturePayPalOrder, 
  getDashboardStatsPayment
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createPayPalOrder);
router.post("/capture-order", capturePayPalOrder);
router.get("/dashboard", requireAuth, getDashboardStatsPayment);

export default router;