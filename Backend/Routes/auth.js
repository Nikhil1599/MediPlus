import express from "express";
import { register, login } from "../Controller/authController.js";

const router = express.Router();
router.post('/register', register);
router.post('/doctors_signup', register)
router.post('/login', login);

export default router;
