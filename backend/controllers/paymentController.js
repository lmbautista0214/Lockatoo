import paypal from "@paypal/checkout-server-sdk";
import client from "../configs/paypalClient.js";
import Payment from "../models/paymentModel.js";
import {Booking} from "../models/bookingModel.js";

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

    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
      bookingStatus: "reserved",
      paymentStatus: "completed",
      payment: payment._id,
    },
    { returnDocument: "after" });

    if (!updatedBooking) {
      throw new Error("Booking not found");
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
    const activeBookings = await Booking.countDocuments({
      bookingStatus: { $in: ["reserved", "active"] }
    });

    const totalBookings = await Booking.countDocuments();

    const revenueResult = await Payment.aggregate([
      { $match: { paymentStatus: "completed" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    res.json({
      activeBookings,
      totalBookings,
      totalRevenue,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createPayPalOrder, capturePayPalOrder, getDashboardStatsPayment };
