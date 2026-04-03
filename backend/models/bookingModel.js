import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
lockerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locker",
},
locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
},
lockerSize: {type: String, required: true},
billingType: {type: String, required: true},
start_datetime: {type: Date, required: true},
end_datetime: {type: Date, required: true},
payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    default: null
},
paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending"
  },
bookingStatus: {type: String, enum: ["reserved", "active", "cancelled", "completed", "forfeited"]},
},
{timestamps: true}
);

export const Booking = mongoose.model("Booking", bookingSchema);