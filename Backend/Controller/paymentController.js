import { instance } from "../auth/payment_api.js";
import dotenv from "dotenv";
import crypto from 'crypto';
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

dotenv.config()
export const checkout = async (req, res) => {
    const { amount } = req.body; // Correctly destructure amount from req.body

    const options = {
        amount: Number(amount) * 100, // Convert amount to the smallest currency unit
        currency: 'INR',
    };

    try {
        const order = await instance.orders.create(options);
        console.log(order);
        res.status(200).json({
            success: true,
            order
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
        console.log(err);
    }
};

export const PaymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, doctorId } = req.body;

    try {
        // Fetch doctor and user details
        const doctor = await Doctor.findById(doctorId);
        const user = await User.findById(req.userId);

        // Verify payment signature
        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET);
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");

        if (digest !== razorpay_signature) {
            return res.status(400).json({ msg: "Transaction is not legit!" });
        }

        // Respond with success message
        res.json({
            msg: "success",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
        });

        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
            session: razorpay_order_id,
        });

        // Save the booking to the database
        await booking.save();
        console.log("Booking created successfully");
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};