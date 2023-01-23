import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
      type: String,
      required: [true, "Please enter a valid email address!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password should be of at least 6 characters!"],
    },
  },{
    timestamps: true,
  }
);
mongoose.models = {};
export default mongoose.model("User", userSchema);