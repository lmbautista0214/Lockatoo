import Location from "../models/locationModel.js";
import cloudinary from "../configs/cloudinary.js";

// CREATE
export const createLocation = async (req, res, next) => {
  try {
    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "locations" }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          })
          .end(req.file.buffer);
      });

      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const lat = parseFloat(
      req.body["locationCoordinates.lat"] || req.body?.locationCoordinates?.lat,
    );
    const lng = parseFloat(
      req.body["locationCoordinates.lng"] || req.body?.locationCoordinates?.lng,
    );

    if (isNaN(lat) || isNaN(lng)) {
      const err = new Error(
        "Valid location coordinates (lat, lng) are required",
      );
      err.statusCode = 400;
      throw err;
    }

    const location = await Location.create({
      ...req.body,
      locationCoordinates: { lat, lng },
      geoLocation: { type: "Point", coordinates: [lng, lat] },
      image: imageUrl,
      imagePublicId,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Location created successfully",
      data: location,
    });
  } catch (error) {
    next(error);
  }
};

// READ ALL with search + filter
export const getAllLocations = async (req, res, next) => {
  try {
    let query = {};

    // Restrict attendants to their own locations
    if (req.user.role === "attendant") {
      query.createdBy = req.user.id;
    }

    // Search by locationName (case-insensitive)
    if (req.query.search) {
      query.locationName = { $regex: req.query.search, $options: "i" };
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    const locations = await Location.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    next(error);
  }
};

// READ BY ID
export const getLocationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id);

    if (!location) {
      const err = new Error("Location not found");
      err.statusCode = 404;
      throw err;
    }

    if (
      req.user.role === "attendant" &&
      location.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(200).json({ data: location });
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    const location = await Location.findById(id);
    if (!location) {
      const err = new Error("Location not found");
      err.statusCode = 404;
      throw err;
    }

    if (
      req.user.role !== "admin" &&
      location.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const lat = parseFloat(
      req.body["locationCoordinates.lat"] || req.body?.locationCoordinates?.lat,
    );
    const lng = parseFloat(
      req.body["locationCoordinates.lng"] || req.body?.locationCoordinates?.lng,
    );

    if (!isNaN(lat) && !isNaN(lng)) {
      updateData.locationCoordinates = { lat, lng };
      updateData.geoLocation = { type: "Point", coordinates: [lng, lat] };
    }

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "locations" }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          })
          .end(req.file.buffer);
      });

      updateData.image = result.secure_url;
      updateData.imagePublicId = result.public_id;
    }

    const updatedLocation = await Location.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Location updated successfully",
      data: updatedLocation,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id);

    if (!location) {
      const err = new Error("Location not found");
      err.statusCode = 404;
      throw err;
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const deletedLocation = await Location.findByIdAndDelete(id);

    if (deletedLocation.imagePublicId) {
      await cloudinary.uploader.destroy(deletedLocation.imagePublicId);
    }

    res
      .status(200)
      .json({ message: "Location and image deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// NEARBY SEARCH
export const getNearbyLocations = async (req, res, next) => {
  try {
    const { lat, lng, distance = 5000 } = req.query;

    if (!lat || !lng) {
      const err = new Error("Latitude and longitude are required");
      err.statusCode = 400;
      throw err;
    }

    const locations = await Location.find({
      geoLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(distance),
        },
      },
    });

    res.status(200).json({
      message: "Nearby locations fetched successfully",
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    next(error);
  }
};
