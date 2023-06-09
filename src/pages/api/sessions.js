import UpcomingSessions from "@/models/upcomingSessions";
import connectDB from "@/config/db";

const handler = async (_, res) => {
  const upComingSessions = await UpcomingSessions.find();
  if (upComingSessions?.length > 0) {
    res.status(200).json({ success: true, upComingSessions });
  } else {
    res
      .status(200)
      .json({ success: false, error: "No upcoming sessions found!" });
  }
};
export default connectDB(handler);
