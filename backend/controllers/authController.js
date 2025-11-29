import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// REGISTER
export const register = async (req, res) => {
  const user = await User.create(req.body);
  createToken(res, user._id);
  res.json(user);
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  createToken(res, user._id);
  res.json(user);
};

// LOGOUT ✅ ADD THIS
export const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(0),
  });

  res.json({ message: "Logged out" });
};

// ME
export const me = async (req, res) => {
  res.json(req.user);
};

