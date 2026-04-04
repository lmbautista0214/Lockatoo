import express from "express";
import {listBookings, listUserBookings, createBooking, readBooking, updateBooking, checkAvailability, deleteBooking, getDashboardStats, getRecentBookings } from "../controllers/bookingControllers.js"
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/view", requireAuth, listBookings);
router.get("/view/user", requireAuth, listUserBookings);
router.get("/recent", requireAuth, getRecentBookings);
router.get("/dashboard", requireAuth, getDashboardStats);
router.post("/reserve", requireAuth, createBooking);
router.get("/:id", readBooking);
router.put("/edit/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.post("/check-availability", checkAvailability);

export default router;