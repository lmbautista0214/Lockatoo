import express from "express";
import { 
    createPricing, 
    listPricingByLocation, 
    updatePricing, 
    deletePricing, 
    readPricing
} from "../controllers/pricingController.js"

const router = express.Router();

router.post("/", createPricing);
router.get("/location/:locationId", listPricingByLocation);
router.put("/:id", updatePricing);
router.delete("/:id", deletePricing);
router.get("/:id", readPricing);

export default router;
