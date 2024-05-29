import express from "express"
import { checkout, PaymentVerification } from "../Controller/paymentController.js"
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router()

router.post("/checkout", authenticate, restrict(["patient"]), checkout)
router.post("/order", authenticate, restrict(["patient"]), PaymentVerification)
export default router;