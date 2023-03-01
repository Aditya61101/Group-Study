import User from "@/models/user";
import UpcomingSessions from "@/models/upcomingSessions";
import connectDB from "@/config/db";
import { APIProtect } from "@/middleware/authMiddleWare";

let success = false;
const handler = async (req, res) => {
  if (await APIProtect(req)===null||await APIProtect(req)===undefined) {
    res.status(400).json({ success, error: "No token found!" });
    return;
  }
  //token.sub provides user id
  const token = await APIProtect(req);
  const user = await User.findById(token.sub);
  if (!user) {
    res.status(400).json({ success, error: "User not found!" });
    return;
  }
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
  console.log("line 30 create session api ", upComingSessions);
  if (upComingSessions) {
    success = true;
    res.status(201).json({ success, upComingSessions });
  } else {
    res.status(400).json({ error: "Unable to create a session", success });
  }
};
export default connectDB(handler);