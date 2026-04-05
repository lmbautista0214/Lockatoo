import {Booking} from "../models/bookingModel.js"
import Location from "../models/locationModel.js";
import { sendBookingEmail } from "./sendEmailController.js";

const listBookings = async (req, res) => {
    try{
        const bookings = await Booking.find()
        .populate("user")
        .populate("lockerId")
        .populate("locationId")
        .populate("payment");

        res.json(bookings);
    }catch(err){
        res.json({error: err.message});
    };
};

const listUserBookings = async (req, res) => {
        const userId = req.user.id;
        try{

        const bookings = await Booking.find({user: userId})
        .populate("lockerId")
        .populate("locationId", "locationName")
        .populate("payment");
        
        res.json({bookings});

    }catch(err){
        res.json({error: err.message});
    };
};

const createBooking = async (req, res) => {
try {
    const {
      lockerId,
      locationId,
      start_datetime,
      end_datetime,
      lockerSize,
      billingType,
    } = req.body;

    if (!lockerId || !locationId || !start_datetime || !end_datetime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const start = new Date(start_datetime);
    const end = new Date(end_datetime);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    const booking = await Booking.create({
      user: req.user?.id,
      lockerId,
      locationId,
      lockerSize,
      billingType,
      start_datetime: start,
      end_datetime: end,

      bookingStatus: "reserved", 
      paymentStatus: "pending", 
    });

    res.status(201).json(booking);

  } catch (err) {
    console.error("CREATE BOOKING ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

const readBooking = async (req, res) => {
    try {
        const id = req.params.id;
        const booking = await Booking.findById(id)
        .populate("user")
        .populate("lockerId")
        .populate("locationId")
        .populate("payment");

    if (!booking) {
        res.json({error: "Record not found"});
        return;
    };
        res.json(booking);

    } catch(err){
        res.json({error: err.message});
    };
};

const updateBooking = async (req, res) => {
    try { 
        const id = req.params.id;
        const newBooking = req.body;

        const booking = await Booking.findByIdAndUpdate(id, newBooking);

        res.json(booking);

    } catch (err) {
        res.json({error: err.message});        
    };
};

const deleteBooking = async (req, res) => {
    try { 
        const id = req.params.id;

        await Booking.findByIdAndDelete(id);

        res.json({message: "Successfully deleted!"})
    } catch (err) {
        res.json({error: err.message});   
    };
};

const checkAvailability = async (req,res) => {
      const { lockerId, start_datetime, end_datetime } = req.body;
    try{
        const overlappingBooking = await Booking.findOne({
            lockerId,
            bookingStatus: {$in: ["reserved", "paid"]},
            $or: [
        {
          start_datetime: { $lt: end_datetime },
          end_datetime: { $gt: start_datetime },
        },
      ],
        });

        if (overlappingBooking) {
            return res.json({available: false});
        };

        res.json({available: true})
    }catch(err) {
        res.json(err)
    };
};

const getDashboardStats = async (req, res) => {
  try {
    const adminId = req.user.id;

    const activeStatuses = ["reserved", "active"];

    const locations = await Location.find({
      createdBy: adminId,
    });

    const locationIds = locations.map((loc) => loc._id);

    if (locationIds.length === 0) {
      return res.json({
        activeBookings: 0,
        totalBookings: 0,
      });
    }

    const activeBookings = await Booking.countDocuments({
      locationId: { $in: locationIds },
      bookingStatus: { $in: activeStatuses },
    });

    const totalBookings = await Booking.countDocuments({
      locationId: { $in: locationIds },
    });

    res.json({
      activeBookings,
      totalBookings,
    });

  } catch (err) {
    console.error("DASHBOARD STATS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

const getRecentBookings = async (req, res) => {
  try {
    const adminId = req.user.id;

    const locationIds = await Location.find({
      createdBy: adminId,
    }).distinct("_id");

    if (locationIds.length === 0) {
      return res.json([]);
    }

    const bookings = await Booking.find({
      locationId: { $in: locationIds },
    })
      .populate("locationId", "locationName")
      .populate("lockerId", "code")
      .populate("payment")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(bookings);

  } catch (err) {
    console.error("RECENT BOOKINGS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

const getBookingsByLocation = async (req, res) => {
  try {
    const adminId = req.user.id;

    const locations = await Location.find({ createdBy: adminId });

    const locationIds = locations.map((loc) => loc._id);

    const bookingStats = await Booking.aggregate([
      {
        $match: {
          locationId: { $in: locationIds },
        },
      },
      {
        $group: {
          _id: "$locationId",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = locations.map((loc) => {
      const found = bookingStats.find(
        (b) => b._id.toString() === loc._id.toString()
      );

      return {
        locationId: loc._id,
        locationName: loc.locationName,
        count: found ? found.count : 0,
      };
    });

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { bookingStatus: "cancelled" },
      { new: true }
    ).populate("locationId user lockerId");

    if (!booking) throw new Error("Booking not found");

    try {
      await sendBookingEmail(
        "cancelled",
        booking,
        booking.user.email
      );
    } catch (err) {
      console.error("CANCEL EMAIL FAILED:", err.message);
    }

    res.json({ success: true, booking });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { listBookings, listUserBookings, createBooking, readBooking, updateBooking, deleteBooking, checkAvailability, getDashboardStats, getRecentBookings, getBookingsByLocation, cancelBooking };