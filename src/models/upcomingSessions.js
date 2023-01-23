import mongoose from "mongoose";

const upcomingSessionsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Please add a title of the session"],
  },
  subject: {
    type: String,
  },
  startDate: {
    type: Date,
    required: [true, "Please mention a start Date"],
  },
  startTime: {
    type: String,
    required: [true, "Please mention a start time."],
  },
  endDate: {
    type: Date,
    required: [true, "Please mention a end Date"],
  },
  endTime: {
    type: String,
    required: [true, "Please mention a end time"],
  },
  maxStudents: {
    type: Number,
    min: 1,
    max: 70,
    required: [true, "Please mention maximum number of students."],
  },
});
mongoose.models = {};
export default mongoose.model("UpcomingSessions", upcomingSessionsSchema);