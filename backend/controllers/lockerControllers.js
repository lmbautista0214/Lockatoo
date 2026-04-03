import { Locker } from "../models/lockerModel.js";
import mongoose from "mongoose";
import {Booking} from "../models/bookingModel.js";

export const createLockers = async (req, res) => {
  try {
    const { locationId, lockers } = req.body;

    let created = [];

    for (const size in lockers) {
      const count = lockers[size];

      const lockersList = await Locker.find({ size, locationId });

      let max = 0;

      lockersList.forEach((l) => {
        const num = parseInt(l.code.split("-")[1]);
        if (num > max) max = num;
      });

      for (let i = 1; i <= count; i++) {
        created.push({
          code: `${size.toUpperCase()}-${max + i}`,
          size,
          locationId,
          status: "available",
        });
      }
    }

    if (created.length === 0) {
      return res.status(400).json({ message: "No lockers to create" });
    }

    await Locker.insertMany(created);

    res.status(201).json({
      message: "Lockers created successfully",
      count: created.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const viewLockers = async (req, res) => {
  try {
    const { locationId } = req.params;

    if (!locationId) {
      return res.status(400).json({ message: "Location ID is required" });
    };

    const lockers = await Locker.find({ locationId });

    res.json({
      lockers,
      count: lockers.length,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  };
};

export const getAllLockers = async (req, res) => {
  try {
    const lockers = await Locker.find();
    res.json(lockers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLockerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = ["available", "occupied", "reserved", "out_of_service"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const locker = await Locker.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!locker) {
      return res.status(404).json({ message: "Locker not found" });
    }

    res.status(200).json({
      message: "Locker status updated",
      locker,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLocker = async (req, res) => {
  try {
    const { id } = req.params;

    const locker = await Locker.findByIdAndDelete(id);

    if (!locker) {
      return res.status(404).json({ message: "Locker not found" });
    }

    res.status(200).json({
      message: "Locker deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAvailableLockers = async (req, res) => {
  try {
    const { locationId, start_datetime, end_datetime } = req.body;

    if (!locationId || !start_datetime || !end_datetime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const parsedLocationId = new mongoose.Types.ObjectId(locationId);

    const lockers = await Locker.find({locationId: parsedLocationId});

    const conflictingBookings = await Booking.find({
      locationId: parsedLocationId,
      bookingStatus: { $in: ["reserved", "paid"] },
      $or: [
        {
          start_datetime: { $lt: new Date(end_datetime) },
          end_datetime: { $gt: new Date(start_datetime) },
        },
      ],
    });

    const bookedLockerIds = conflictingBookings
      .filter(booked => booked.lockerId)
      .map(booked => booked.lockerId.toString())

    const availableLockers = lockers.filter(
      (locker) =>
        locker.status === "available" &&
        !bookedLockerIds.includes(locker._id.toString())
    );

    res.json({
      lockers: availableLockers,
      count: availableLockers.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

export const getLockerSizesByLocation = async (req, res, next) => {
  try {
    const { locationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
      return res.status(400).json({ message: "Invalid location ID" });
    }

    const lockers = await Locker.find({ locationId: locationId });

    if (!lockers || lockers.length === 0) {
      return res.json([]);
    }

    const sizes = [...new Set(lockers.map(l => l.size))];

    res.json(sizes);

  } catch (error) {
    console.error("LOCKER SIZE ERROR:", error);
    res.status(500).json({ message: error.message });
    next(error);
  }
};
