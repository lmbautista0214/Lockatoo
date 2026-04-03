import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },

  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },

  paymentMethod: {
    type: String,
    enum: ["paypal"],
    default: "paypal"
  },

  amount: { type: Number, required: true },

  currency: { type: String, default: "PHP" },

  paypalOrderId: { type: String }, // from PayPal

  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending"
  },

  paypalDetails: {
  payerId: String,
  email: String,
  status: String,
}

}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);