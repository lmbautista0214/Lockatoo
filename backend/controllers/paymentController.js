import paypal from "@paypal/checkout-server-sdk";
import client from "../configs/paypalClient.js";
import Payment from "../models/paymentModel.js";
import {Booking} from "../models/bookingModel.js";
import Location from "../models/locationModel.js";
import { sendBookingEmail } from "./sendEmailController.js";


const createPayPalOrder = async (req, res) => {
  const { amount } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "PHP",
          value: amount,
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const capturePayPalOrder = async (req, res) => {
  const { orderId, bookingId, userId, amount } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderId);

  try {
    const capture = await client.execute(request);
console.log("CAPTURE RESULT:", capture.result);

const payer = capture.result.payer;

    const payment = await Payment.create({
      userId,
      bookingId,
      amount,
      paypalOrderId: orderId,
      paymentStatus: "completed",
      paypalDetails: {
        payerId: payer.payer_id,
        email: payer.email_address,
        captureId: capture.result.id
      },
    });

    // const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
    //   bookingStatus: "reserved",
    //   paymentStatus: "completed",
    //   payment: payment._id,
    // },
    // { returnDocument: "after" });

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        bookingStatus: { $in: ["reserved", "active"] },
        paymentStatus: "completed",
        payment: payment._id,
      },
      { new: true }
    )
    .populate("locationId")
    .populate("userId");

    if (!updatedBooking) {
      throw new Error("Booking not found");
    }

    try {
      const userEmail =
        updatedBooking.userId?.email || payer.email_address;

      await sendBookingEmail(
        "confirmation",
        updatedBooking,
        userEmail
      );
    } catch (emailErr) {
      console.error("EMAIL FAILED:", emailErr.message);
    }

    res.json({
      success: true,
      payment,
      booking: updatedBooking,
      captureData: capture.result,
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDashboardStatsPayment = async (req, res) => {
  try {
    const adminId = req.user.id;

    const locations = await Location.find({ createdBy: adminId });
    const locationIds = locations.map((loc) => loc._id);

    if (locationIds.length === 0) {
      return res.json({
        activeBookings: 0,
        totalBookings: 0,
        totalRevenue: 0,
      });
    }

    const activeBookings = await Booking.countDocuments({
      locationId: { $in: locationIds },
      bookingStatus: { $in: ["reserved", "active"] },
    });

    const totalBookings = await Booking.countDocuments({
      locationId: { $in: locationIds },
    });

    const revenueResult = await Payment.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "booking",
          foreignField: "_id",
          as: "bookingData",
        },
      },
      { $unwind: "$bookingData" },

      {
        $match: {
          paymentStatus: "completed",
          "bookingData.locationId": { $in: locationIds },
        },
      },

      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    res.json({
      activeBookings,
      totalBookings,
      totalRevenue,
    });

  } catch (err) {
    console.error("DASHBOARD PAYMENT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

export { createPayPalOrder, capturePayPalOrder, getDashboardStatsPayment };
