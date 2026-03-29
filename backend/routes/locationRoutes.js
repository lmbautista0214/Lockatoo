import express from "express";
import upload from "../middlewares/multerMiddleware.js";

import { requireAuth } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
  getNearbyLocations,
} from "../controllers/locationControllers.js";

import {
  validateCreateLocation,
  validateUpdateLocation,
} from "../validators/locationValidator.js";

const router = express.Router();

// Read all locations → allowed for all roles
router.get(
  "/",
  requireAuth,
  requireRole("admin", "attendant", "user"),
  getAllLocations,
);

// You can restrict to admin only, or open to all roles depending on the needs
router.get(
  "/nearby",
  requireAuth,
  requireRole("admin", "attendant", "user"),
  getNearbyLocations,
);

// Read single location → allowed for all roles
router.get(
  "/:id",
  requireAuth,
  requireRole("admin", "attendant", "user"),
  getLocationById,
);

// Create location → admin only
router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  upload.single("image"),
  validateCreateLocation,
  createLocation,
);

// Update location → admin only
router.put(
  "/:id",
  requireAuth,
  requireRole("admin"),
  upload.single("image"),
  validateUpdateLocation,
  updateLocation,
);

// Delete location → only admin
router.delete("/:id", requireAuth, requireRole("admin"), deleteLocation);

export default router;
