import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    locationName: {
      type: String,
      required: true,
      trim: true,
      index: true, // for search
    },

    locationDescription: {
      type: String,
      default: "",
      trim: true,
    },

    locationAddress: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      province: { type: String, trim: true },
      postalCode: { type: String, trim: true },
      country: {
        type: String,
        default: "Philippines",
      },
    },

    locationCoordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },

    geoLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
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
      open: { type: String }, // e.g., "08:00"
      close: { type: String }, // e.g., "22:00"
    },

    image: {
      type: String, // optional, store Cloudinary URL
      default: "", // if no image is uploaded
    },
  },
  { timestamps: true },
);

// Auto-sync geoLocation on CREATE
locationSchema.pre("save", function (next) {
  if (this.locationCoordinates) {
    this.geoLocation = {
      type: "Point",
      coordinates: [this.locationCoordinates.lng, this.locationCoordinates.lat],
    };
  }
  next();
});

// Auto-sync geoLocation on UPDATE
locationSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  const coords =
    update.locationCoordinates ||
    (update.$set && update.$set.locationCoordinates);
  if (coords) {
    if (update.$set) {
      update.$set.geoLocation = {
        type: "Point",
        coordinates: [coords.lng, coords.lat],
      };
    } else {
      update.geoLocation = {
        type: "Point",
        coordinates: [coords.lng, coords.lat],
      };
    }
  }
  next();
});

// Geo index for nearest locker queries
locationSchema.index({ geoLocation: "2dsphere" });

export default mongoose.model("Location", locationSchema);
