import express from "express";
import {readDetails, updateDetails, deleteUser, updatePassword, getMe } from "../controllers/userController.js"
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

//add isAllowed middleware!!
router.get("/view/:id", readDetails);
router.put("/edit/:id", updateDetails);
router.put("/update-password", requireAuth, updatePassword);
router.delete("/delete/:id", deleteUser);
router.get("/me", requireAuth, getMe);

export default router;