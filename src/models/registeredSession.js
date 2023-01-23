import mongoose from "mongoose";

const registeredSession = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "UpcomingSessions",
  },
});
mongoose.models = {};
export default mongoose.model("RegisteredSession", registeredSession);
