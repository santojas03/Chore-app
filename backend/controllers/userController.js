import User from "../models/UserSchema.js";
import { signToken } from "../utils/token.js";

// POST /api/auth/register  { name, email, password }
export const register = async (req, res) => {
  const { name, email, password } = req.body ?? {};
  const user = await User.create({ name, email, password });
  res.status(201).json({ token: signToken(user._id), user });
};

// POST /api/auth/login  { email, password }
export const login = async (req, res) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
    "+password",
  );
  // Same message for unknown email and wrong password, so the response
  // doesn't reveal which emails have accounts.
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  user.lastLogin = new Date();
  await user.save();
  res.json({ token: signToken(user._id), user });
};

// GET /api/auth/me
export const getMe = (req, res) => {
  res.json({ user: req.user });
};
