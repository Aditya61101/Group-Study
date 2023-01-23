import User from "@/models/user";
import UpcomingSessions from "@/models/upcomingSessions";
import connectDB from "@/config/db";

let success = false;
const handler = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400).json({ success, error: "User not found!" });
  }
  console.log(req.body);
  const upComingSessions = await UpcomingSessions.insertMany({
    user: user.id,
    title: req.body.title,
    subject: req.body.subject,
    startDate: req.body.startDate,
    startTime: req.body.startTime,
    endDate: req.body.endDate,
    endTime: req.body.endTime,
    maxStudents: req.body.maxStudents,
  });
  // console.log(upComingSessions);
  if (upComingSessions) {
    success = true;
    res.status(201).json({ success, upComingSessions });
  } else {
    res.status(400).json({ error: "Unable to create a session", success });
  }
};
export default connectDB(handler);
