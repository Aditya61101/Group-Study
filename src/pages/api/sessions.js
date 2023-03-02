import UpcomingSessions from "@/models/upcomingSessions";
import connectDB from "@/config/db";
import { APIProtect } from "@/middleware/authMiddleWare";

const handler = async (req, res) => {
  
  if(await APIProtect(req)===null||await APIProtect(req)===undefined){
    res.status(400).json({ success:false, error: "No token found!" });
    return;
  }
  const upComingSessions = await UpcomingSessions.find();
  if (upComingSessions?.length > 0) {
    res.status(201).json({ success:true, upComingSessions });
  } else {
    res.status(204).json({ success:false, error: "No upcoming sessions found!" });
  }
};
export default connectDB(handler);