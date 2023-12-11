import connectDB from "@/config/db";
import User from "@/models/user";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  try {
    const { email, password, cnfPassword } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Please enter all fields!" });
      return;
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({ error: "User already exists!" });
      return;
    }

    if (password !== cnfPassword) {
      res.status(400).json({ error: "Passwords do not match" });
      return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 11);
      const createdUser = await User.create({
        email,
        password: hashedPassword,
      });
      res.status(201).json({
        success: true,
        id: createdUser._id,
        email: createdUser.email,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default connectDB(handler);
