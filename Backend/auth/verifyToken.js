import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  //get token from headers
  const authToken = req.headers.authorization;
  //if token exists
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }

  try {
    //console.log(authToken)
    const token = authToken.split(" ")[1];
    //verify token
    const decoded = jwt.verify(token, process.env.local.JWT_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid Token" });
    console.log(err)
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  let users;

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    users = patient;
  }
  if (doctor) {
    users = doctor;
  }

  if (!roles.includes(users.role)) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  }
  next();
};
