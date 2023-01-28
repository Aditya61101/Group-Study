import connectDB from "@/config/db";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const handler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Please enter all fields!" });
    return;
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ error: "Please enter correct email address!" });
    return;
  }
  const bytes = CryptoJS.AES.decrypt(user.password, process.env.JWT_SECRET);
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  if (password == originalPassword) {
    res.status(201).json({
      success: true,
      id: user._id,
      email: user.email,
      token: genToken(user._id),
    });
  } else {
    res.status(400).json({ success: false, error: "Invalid Credentials!" });
  }
};
export default connectDB(handler);
