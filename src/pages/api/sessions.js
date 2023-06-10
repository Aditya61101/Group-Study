import UpcomingSessions from "@/models/upcomingSessions";
import connectDB from "@/config/db";

const handler = async (_, res) => {
  try{
      const upComingSessions = await UpcomingSessions.find();
    if (upComingSessions?.length > 0) {
      res.status(200).json({ success: true, upComingSessions });
    } else {
      res
        .status(200)
        .json({ success: false, error: "No upcoming sessions found!" });
    }
  } catch {
     res.status(500).json({ success: false, error: "Internal Server Error" });
  }
  
};
export default connectDB(handler);
