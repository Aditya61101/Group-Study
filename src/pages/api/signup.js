import connectDB from "@/config/db";
import User from "@/models/user";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  try {
    const { email, password, cnfPassword } = req.body;
    console.log("Request Body:", req.body);
    if (!email || !password || !cnfPassword) {
      console.error("Validation Error: Please enter all fields");
      res.status(400).json({ error: "Please enter all fields" });
      return;
    }
    const user = await User.findOne({ email });
    if (user) {
      console.error("Conflict Error: User already exists");
      res.status(409).json({ error: "User already exists" });
      return;
    }

    if (password !== cnfPassword) {
      console.error("Validation Error: Passwords do not match");
      res.status(400).json({ error: "Passwords do not match" });
      return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 11);
      const createdUser = await User.create({
        email,
        password: hashedPassword,
      });
      console.log("User created:", createdUser);
      res.status(201).json({
        success: true,
        id: createdUser._id,
        email: createdUser.email,
      });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default connectDB(handler);
