import connectDB from "@/config/db";
import UpcomingSessions from "@/models/upcomingSessions";
import User from "@/models/user";
import RegisteredSession from "@/models/registeredSession";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user) {
      res.status(401).json({ success: false, error: "Unauthenticated" });
      return;
    }
    const user = await User.findOne({ email: session.user.email });

    const upComingSession = await UpcomingSessions.findById(
      req.query.sessionId
    );
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
      res.status(403).json({ success: false, error: "User not authorized" });
      return;
    }
    if (req.method === "PUT") {
      const updatedSession = await UpcomingSessions.findByIdAndUpdate(
        req.query.sessionId,
        req.body,
        { new: true }
      );
      res.status(200).json({ updatedSession, success: true });
    } else if (req.method === "GET") {
      let query = { session: `${req.query.sessionId}` }
      let registeredSessions = await RegisteredSession.find(query)
      const regStudIds = registeredSessions.map(session => session.user);
      // const countSession = await RegisteredSession.countDocuments(query);
      let countSession = registeredSessions.length;
      res.status(201).json({
        sessionId: req.query.sessionId,
        regStudCount: countSession,
        regStudIds: regStudIds,
      });
      return;
    } else if (req.method === "DELETE") {
      await UpcomingSessions.findByIdAndDelete(req.query.sessionId);
      res.status(204).json({ id: req.query.sessionId, success: true });
    } else if (req.method === "POST") {
      const userRegistered = await RegisteredSession.findOne({
        user: user._id,
        session: req.query.sessionId,
      });
      const session = await UpcomingSessions.findById(req.query.sessionId);
      let query = { session: `${req.query.sessionId}` }
      let countSession = await RegisteredSession.countDocuments(query);
      if (session.user === user._id) {
        res
          .status(400)
          .json({
            success,
            error: "You cannot register for your own session.",
          });
        return;
      }
      if (userRegistered) {
        const unRegSession = await RegisteredSession.deleteMany({
          user: user._id,
          session: req.query.sessionId,
        });
        if (unRegSession) {
          res.status(201).json({
            success: true,
            action: "unregister",
            message: "User unregistered successfully!",
            sessionId: req.query.sessionId,
          });
        } else {
          res.status(400).json({
            success: false,
            error: "Could not unregister. Please try again!",
            sessionId: req.query.sessionId,
          });
        }
        return
      } else if (session.maxStudents <= countSession) {
        res.status(409).json({
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
            action: "register",
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
      res.status(405).json({ success: false, error: "Method not allowed!" });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
export default connectDB(handler);
