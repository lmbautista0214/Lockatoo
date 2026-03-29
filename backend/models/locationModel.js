import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    locationName: { type: String, required: true, trim: true, index: true },
    locationDescription: { type: String, default: "", trim: true },
    locationAddress: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      province: { type: String, trim: true },
      postalCode: { type: String, trim: true },
      country: { type: String, default: "Philippines" },
    },
    locationCoordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    geoLocation: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },
    status: {
      type: String,
      enum: ["ACTIVE", "MAINTENANCE", "INACTIVE"],
      default: "ACTIVE",
    },
    type: {
      type: String,
      enum: ["MALL", "STATION", "AIRPORT", "SCHOOL", "OTHER"],
      default: "OTHER",
    },
    operatingHours: {
      open: { type: String },
      close: { type: String },
    },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

locationSchema.pre("save", function () {
  if (
    this.locationCoordinates?.lat !== undefined &&
    this.locationCoordinates?.lng !== undefined
  ) {
    this.geoLocation = {
      type: "Point",
      coordinates: [this.locationCoordinates.lng, this.locationCoordinates.lat],
    };
  }
});

locationSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();
  const coords =
    update.locationCoordinates ||
    (update.$set && update.$set.locationCoordinates);

  if (coords?.lat !== undefined && coords?.lng !== undefined) {
    const geo = { type: "Point", coordinates: [coords.lng, coords.lat] };
    if (update.$set) {
      update.$set.geoLocation = geo;
    } else {
      update.geoLocation = geo;
    }
  }
});

// Geo index for nearest locker queries
locationSchema.index({ geoLocation: "2dsphere" });

export default mongoose.model("Location", locationSchema);
