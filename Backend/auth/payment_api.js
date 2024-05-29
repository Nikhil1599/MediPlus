import dotenv from "dotenv";
import Razorpay from "razorpay";

// Load environment variables from .env file
dotenv.config();

// Create Razorpay instance
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
});
