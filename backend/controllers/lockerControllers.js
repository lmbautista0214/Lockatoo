import { Locker } from "../models/lockerModel.js";

export const createLockers = async (req, res) => {
    try {
        const { storeId, lockers } = req.body;

        let created = [];

        for (const size in lockers) {
            const count = lockers[size];

            const lockersList = await Locker.find({ size, storeId });

            let max = 0;

            lockersList.forEach(l => {
                const num = parseInt(l.code.split("-")[1]);
                if (num > max) max = num;
            });

            for (let i = 1; i <= count; i++) {
                created.push({
                    code: `${size.toUpperCase()}-${max + i}`,
                    size,
                    storeId
                });
            }
        }

        await Locker.insertMany(created);

        res.status(201).json({ message: "Lockers created" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const viewLockers = async (req, res) => {
    try {
        const { storeId } = req.params;

        if (!storeId) {
            return res.status(400).json({ message: "Store ID is required" });
        }

        const lockers = await Locker.find({ storeId }).sort({ size: 1, code: 1 });

        res.json({
            lockers,
            count: lockers.length
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllLockers = async (req, res) => {
  try {
    const lockers = await Locker.find();
    res.json(lockers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLockerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatus = ["available", "occupied", "reserved", "out_of_service"];

        if (!validStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const locker = await Locker.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!locker) {
            return res.status(404).json({ message: "Locker not found" });
        }

        res.status(200).json({
            message: "Locker status updated",
            locker
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteLocker = async (req, res) => {
  try {
    const { id } = req.params;

    const locker = await Locker.findByIdAndDelete(id);

    if (!locker) {
      return res.status(404).json({ message: "Locker not found" });
    }

    res.status(200).json({
      message: "Locker deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};