import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPass });

    return res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({ success: true, message: "Login Successful", token });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};
