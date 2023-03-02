import connectDB from "@/config/db";
import User from "@/models/user";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Please enter all fields!" });
    return;
  }
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({ error: "User already exists!" });
    return;
  }
  const hashedPassword = CryptoJS.AES.encrypt(password, process.env.NEXTAUTH_SECRET).toString();
  const createdUser = await User.create({
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    success:true,
    id: createdUser._id,
    email: createdUser.email,
  });
};
export default connectDB(handler);