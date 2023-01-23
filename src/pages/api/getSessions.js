import UpcomingSessions from "@/models/upcomingSessions";
import connectDB from "@/config/db";

let success = false;
const handler = async (req, res) => {
  const upComingSessions = await UpcomingSessions.find();
//   console.log(upComingSessions);
  if (upComingSessions.length > 0) {
    success = true;
    res.status(201).json({ success, upComingSessions });
  } else {
    res.status(400).json({ success, error: "No upcoming sessions found!" });
  }
};
export default connectDB(handler);