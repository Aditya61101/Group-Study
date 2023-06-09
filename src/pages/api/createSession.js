import User from "@/models/user";
import UpcomingSessions from "@/models/upcomingSessions";
import connectDB from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const handler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user) {
      res.status(401).json({ success: false, error: "Unauthenticated" });
      return;
    }
    const user = await User.findOne({ email: session.user.email });

    const upComingSessions = await UpcomingSessions.create({
      user: user._id,
      title: req.body.title,
      subject: req.body.subject,
      startDate: req.body.startDate,
      startTime: req.body.startTime,
      endDate: req.body.endDate,
      endTime: req.body.endTime,
      maxStudents: req.body.maxStudents,
    });
    if (upComingSessions) {
      res.status(201).json({ success: true, upComingSessions });
    } else {
      res
        .status(400)
        .json({ error: "Unable to create a session", success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
export default connectDB(handler);
