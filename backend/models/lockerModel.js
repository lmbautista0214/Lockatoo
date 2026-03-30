import mongoose from "mongoose";

const lockerSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    size:{
        type: String,
        enum: ["xs", "s", "m", "l", "xl", "xxl"],
        required: true
    },
    status: {
        type: String,
        enum: ["available", "occupied", "out_of_service", "reserved"],
        default:"available"
    },
    storeId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Store", 
        type:String,
        required:true
    },
}, {timestamps: true});


export const Locker = mongoose.model("Locker", lockerSchema);