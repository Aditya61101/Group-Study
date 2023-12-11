import registeredSession from "@/models/registeredSession";
import connectDB from "@/config/db";

const handler = async (_, res) => {
  try{
      const registeredsession = await registeredSession.find();
    if (registeredsession?.length > 0) {
      res.status(200).json({ success: true, registeredsession });
    } else {
      res
        .status(200)
        .json({ success: false, error: "No upcoming sessions found!" });
    }
  } catch(err) {
     res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
export default connectDB(handler);
