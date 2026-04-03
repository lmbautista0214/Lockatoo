import express from "express";
import {
  createLockers,
  viewLockers,
  updateLockerStatus,
  deleteLocker,
  getAllLockers,
  getLockerSizesByLocation,
  getAvailableLockers
} from "../controllers/lockerControllers.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add",requireAuth, requireRole("admin"), createLockers);
router.get("/view/:locationId",requireAuth, requireRole("admin", "user"), viewLockers);
router.patch("/:id",requireAuth, requireRole("admin"), updateLockerStatus);
router.delete("/:id",requireAuth, requireRole("admin"), deleteLocker);
router.get("/", requireAuth, requireRole("admin", "user"), getAllLockers);
router.get("/location/:locationId/sizes", requireAuth, requireRole("admin"), getLockerSizesByLocation);
router.post("/available",requireAuth, requireRole("user"), getAvailableLockers);


export default router;