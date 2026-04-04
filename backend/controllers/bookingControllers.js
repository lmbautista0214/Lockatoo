import {Booking} from "../models/bookingModel.js"

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
    const activeStatuses = ["reserved", "active"];

    const activeBookings = await Booking.countDocuments({
      bookingStatus: { $in: activeStatuses },
    });

    const totalBookings = await Booking.countDocuments();

    res.json({
      activeBookings,
      totalBookings,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecentBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("locationId", "locationName")
      .populate("lockerId", "code")
      .populate("payment")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(bookings);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { listBookings, listUserBookings, createBooking, readBooking, updateBooking, deleteBooking, checkAvailability, getDashboardStats, getRecentBookings };