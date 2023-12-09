import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter a valid email address!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password should be of at least 6 characters!"],
    },
    name: {
      type: String,
      required: [true, "Obviously you have a name!"],
    }, 
    age: {
      type: Number,
      required: true
    },
    college: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);
mongoose.models = {};
export default mongoose.model("User", userSchema);