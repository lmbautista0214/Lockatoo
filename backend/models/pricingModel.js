import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema({
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true
    },
    lockerSize: {
        type: String,
        enum: ["xs", "s", "m", "l", "xl", "xxl"],
        required: true
    },
    pricePerHour: {
        type: Number,
        min: 0,
    },
    pricePerDay: {
        type: Number,
        min: 0,
    },
    pricePerWeek: {
        type: Number,
        min: 0,
    },
    pricePerMonth: {
        type: Number,
        min: 0,
    },
    extraHourFee: {
        type: Number,
        min: 0,
    },
    currency: {
        type: String,
        enum: ["PHP", "USD"],
        default: "PHP",
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    }
}, { timestamps: true });

pricingSchema.index({ locationId: 1, lockerSize: 1 }, { unique: true });

const Pricing = mongoose.model("Pricing", pricingSchema);

export default Pricing;