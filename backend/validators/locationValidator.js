const parseCoordinates = (req) => {
  const lat = parseFloat(
    req.body?.locationCoordinates?.lat ?? req.body["locationCoordinates.lat"],
  );
  const lng = parseFloat(
    req.body?.locationCoordinates?.lng ?? req.body["locationCoordinates.lng"],
  );
  return { lat, lng };
};

export const validateCreateLocation = (req, res, next) => {
  const { locationName, type, status, operatingHours } = req.body;

  if (!locationName || locationName.trim() === "") {
    const error = new Error("Location name is required");
    error.statusCode = 400;
    return next(error);
  }

  const { lat, lng } = parseCoordinates(req);

  if (isNaN(lat) || isNaN(lng)) {
    const error = new Error(
      "Valid location coordinates (lat, lng) are required",
    );
    error.statusCode = 400;
    return next(error);
  }

  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    const error = new Error("Invalid latitude or longitude values");
    error.statusCode = 400;
    return next(error);
  }

  const validTypes = ["MALL", "STATION", "AIRPORT", "SCHOOL", "OTHER"];
  if (type && !validTypes.includes(type)) {
    const error = new Error("Invalid location type");
    error.statusCode = 400;
    return next(error);
  }

  const validStatus = ["ACTIVE", "MAINTENANCE", "INACTIVE"];
  if (status && !validStatus.includes(status)) {
    const error = new Error("Invalid status value");
    error.statusCode = 400;
    return next(error);
  }

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (operatingHours) {
    if (operatingHours.open && !timeRegex.test(operatingHours.open)) {
      const error = new Error("Invalid opening time format (HH:mm)");
      error.statusCode = 400;
      return next(error);
    }
    if (operatingHours.close && !timeRegex.test(operatingHours.close)) {
      const error = new Error("Invalid closing time format (HH:mm)");
      error.statusCode = 400;
      return next(error);
    }
  }

  req.body.locationCoordinates = { lat, lng };

  next();
};

export const validateUpdateLocation = (req, res, next) => {
  const { locationName, type, status, operatingHours } = req.body;

  if (locationName && locationName.trim() === "") {
    const error = new Error("Location name cannot be empty");
    error.statusCode = 400;
    return next(error);
  }

  const { lat, lng } = parseCoordinates(req);

  if (!isNaN(lat) || !isNaN(lng)) {
    if (isNaN(lat) || isNaN(lng)) {
      const error = new Error(
        "Both latitude and longitude must be provided together",
      );
      error.statusCode = 400;
      return next(error);
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      const error = new Error("Invalid latitude or longitude values");
      error.statusCode = 400;
      return next(error);
    }

    req.body.locationCoordinates = { lat, lng };
  }

  const validTypes = ["MALL", "STATION", "AIRPORT", "SCHOOL", "OTHER"];
  if (type && !validTypes.includes(type)) {
    const error = new Error("Invalid location type");
    error.statusCode = 400;
    return next(error);
  }

  const validStatus = ["ACTIVE", "MAINTENANCE", "INACTIVE"];
  if (status && !validStatus.includes(status)) {
    const error = new Error("Invalid status value");
    error.statusCode = 400;
    return next(error);
  }

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (operatingHours) {
    if (operatingHours.open && !timeRegex.test(operatingHours.open)) {
      const error = new Error("Invalid opening time format (HH:mm)");
      error.statusCode = 400;
      return next(error);
    }
    if (operatingHours.close && !timeRegex.test(operatingHours.close)) {
      const error = new Error("Invalid closing time format (HH:mm)");
      error.statusCode = 400;
      return next(error);
    }
  }

  next();
};
