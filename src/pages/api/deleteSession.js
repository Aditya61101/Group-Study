import connectDB from "@/config/db";
import UpcomingSessions from "@/models/upcomingSessions";
import User from "@/models/user";

let success = false;
const handler = async (req, res) => {
  const upComingSession = await UpcomingSessions.findById(req.params.id);
  if (!upComingSession) {
    res.status(400).json({ success, error: "No upcoming sessions found!" });
    return;
  }
  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401).json({ success, error: "User not found!" });
    return;
  }
  //if session is not user's created session then user shouldn't delete it
  if (upComingSession.user.toString() != user.id) {
    res.status(401).json({ success, error: "User not authorized" });
    return;
  }
  await UpcomingSessions.findByIdAndDelete(req.params.id);
  res.status(201).json({ id: req.params.id, success: true });
};
export default connectDB(handler);
