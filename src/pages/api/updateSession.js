import connectDB from "@/config/db";
import UpcomingSessions from "@/models/upcomingSessions";
import User from "@/models/user";

let success = false;
const handler = async (req, res) => {
  console.log(req.params.id);
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
  //if session is not user's created session then user shouldn't update it
  if (upComingSession.user.toString() != user.id) {
    res.status(401).json({ success, error: "User not authorized" });
    return;
  }
  const updatedSession = await UpcomingSessions.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).json({updatedSession, success: true});
};
export default connectDB(handler);