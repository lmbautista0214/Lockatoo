import mongoose from "mongoose";
import Pricing from "../models/pricingModel.js";

const VALID_SIZES = ["xs", "s", "m", "l", "xl", "xxl"];

const hasAnyRate = (data) => {
  return (
    data.pricePerHour != null ||
    data.pricePerDay != null ||
    data.pricePerWeek != null ||
    data.pricePerMonth != null ||
    data.extraHourFee != null
  );
};

const createPricing = async (req, res) => {
  try {
    const { locationId, lockerSize } = req.body;

    if (!locationId || !lockerSize) {
      return res.status(400).json({
        message: "locationId and lockerSize are required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
      return res.status(400).json({
        message: "Invalid location ID"
      });
    }

    const normalizedSize = lockerSize.toLowerCase().trim();

    if (!VALID_SIZES.includes(normalizedSize)) {
      return res.status(400).json({
        message: "Invalid locker size"
      });
    }

    const pricing = await Pricing.create({
      ...req.body,
      lockerSize: normalizedSize,
      isActive: hasAnyRate(req.body) 
    });

    res.status(201).json(pricing);

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Pricing already exists for this location and locker size"
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
};


const listPricingByLocation = async (req, res) => {
  try {
    const { locationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
      return res.status(400).json({
        message: "Invalid location ID"
      });
    }

    const pricing = await Pricing.find({
      locationId: new mongoose.Types.ObjectId(locationId)
    })
      .populate("locationId", "locationName")
      .sort({ createdAt: -1 });

    res.status(200).json(pricing);

  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve pricing"
    });
  }
};


const updatePricing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid pricing ID"
      });
    }

    if (req.body.lockerSize) {
      const normalizedSize = req.body.lockerSize.toLowerCase().trim();

      if (!VALID_SIZES.includes(normalizedSize)) {
        return res.status(400).json({
          message: "Invalid locker size"
        });
      }

      req.body.lockerSize = normalizedSize;
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      }
    });

    console.log("UPDATE BODY:", req.body);

    const existing = await Pricing.findById(id);

    if (!existing) {
      return res.status(404).json({
        message: "Pricing not found"
      });
    }

    const merged = {
      ...existing.toObject(),
      ...req.body
    };

    const updated = await Pricing.findByIdAndUpdate(
      id,
      {
        ...req.body,
        isActive: hasAnyRate(merged)
      },
      {
        new: true,
        runValidators: true,
        strict: true
      }
    );

    console.log("UPDATED RESULT:", updated);

    res.status(200).json({
      message: "Pricing updated successfully",
      pricing: updated
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      message: "Failed to update pricing",
      error: error.message
    });
  }
};

const readPricing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid pricing ID"
      });
    }

    const pricing = await Pricing.findById(id)
      .populate("locationId", "locationName");

    if (!pricing) {
      return res.status(404).json({
        message: "Pricing not found"
      });
    }

    res.status(200).json(pricing);

  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve pricing"
    });
  }
};


const deletePricing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid pricing ID"
      });
    }

    const pricing = await Pricing.findByIdAndDelete(id);

    if (!pricing) {
      return res.status(404).json({
        message: "Pricing not found"
      });
    }

    res.status(200).json({
      message: "Pricing deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete pricing"
    });
  }
};


export {
  createPricing,
  listPricingByLocation,
  readPricing,
  updatePricing,
  deletePricing
};