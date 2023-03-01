import UpcomingSessions from "@/models/upcomingSessions";
import connectDB from "@/config/db";
import { APIProtect } from "@/middleware/authMiddleWare";

let success = false;
const handler = async (req, res) => {
  
  if(await APIProtect(req)===null||await APIProtect(req)===undefined){
    res.status(400).json({ success, error: "No token found!" });
    return;
  }
  const upComingSessions = await UpcomingSessions.find();
  if (upComingSessions?.length > 0) {
    success = true;
    res.status(201).json({ success, upComingSessions });
  } else {
    res.status(204).json({ success, error: "No upcoming sessions found!" });
  }
};
export default connectDB(handler);