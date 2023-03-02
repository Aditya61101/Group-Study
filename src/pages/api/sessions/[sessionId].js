import connectDB from "@/config/db";
import { APIProtect } from "@/middleware/authMiddleWare";
import UpcomingSessions from "@/models/upcomingSessions";
import User from "@/models/user";
import RegisteredSession from "@/models/registeredSession";

const handler = async (req, res) => {
  if (
    (await APIProtect(req)) === null ||
    (await APIProtect(req)) === undefined
  ) {
    res.status(400).json({ success: false, error: "No token found!" });
    return;
  }
  //check for user
  const token = await APIProtect(req);
  const user = await User.findById(token.sub);
  if (!user) {
    res.status(401).json({ success: false, error: "User not found!" });
    return;
  }
  const upComingSession = await UpcomingSessions.findById(req.query.sessionId);
  if (!upComingSession) {
    res
      .status(400)
      .json({ success: false, error: "No upcoming sessions found!" });
    return;
  }
  //if session is not user's created session then user shouldn't update it
  if (
    (req.method === "PUT" || req.method === "DELETE") &&
    upComingSession.user.toString() != user._id
  ) {
    res.status(401).json({ success: false, error: "User not authorized" });
    return;
  }
  if (req.method === "PUT") {
    const updatedSession = await UpcomingSessions.findByIdAndUpdate(
      req.query.sessionId,
      req.body,
      { new: true }
    );
    res.status(201).json({ updatedSession, success: true });
  } else if (req.method === "DELETE") {
    await UpcomingSessions.findByIdAndDelete(req.query.sessionId);
    res.status(201).json({ id: req.query.sessionId, success: true });
  } else if (req.method === "POST") {
    const userRegistered = await RegisteredSession.findOne({
      user: user._id,
      session: req.query.sessionId,
    });
    const session = await UpcomingSessions.findById(req.query.sessionId);
    let countSession = await RegisteredSession.count(req.query.sessionId);

    if (session.user === user._id) {
      res
        .status(400)
        .json({ success, error: "You cannot register for your own session." });
    }
    if (userRegistered) {
      res.status(400).json({
        success: false,
        error: "User has already registered!",
        sessionId: req.query.sessionId,
      });
    } else if (session.maxStudents <= countSession) {
      res.status(400).json({
        success: false,
        error: "Session Fulled!",
        sessionId: req.query.sessionId,
      });
    } else {
      const regSession = await RegisteredSession.insertMany({
        user: user._id,
        session: req.query.sessionId,
      });
      if (regSession) {
        res.status(201).json({
          success: true,
          message: "User Registered successfully!",
          sessionId: req.query.sessionId,
        });
      } else {
        res.status(400).json({
          success: false,
          error: "User not registered",
          sessionId: req.query.sessionId,
        });
      }
    }
  } else {
    res.status(400).json({ success: false, error: "Method not allowed!" });
    return;
  }
};
export default connectDB(handler);
