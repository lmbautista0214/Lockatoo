import express from "express";
import { createLockers, viewLockers, updateLockerStatus, deleteLocker, getAllLockers } from "../controllers/lockerControllers.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import { requireAuth } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/add",requireAuth, requireRole("admin"), createLockers);
router.get("/view/:storeId",requireAuth, requireRole("admin"), viewLockers);
router.patch("/:id",requireAuth, requireRole("admin"), updateLockerStatus);
router.delete("/:id",requireAuth, requireRole("admin"), deleteLocker);
router.get("/", requireAuth, requireRole("admin"), getAllLockers);

export default router;