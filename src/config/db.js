import mongoose from "mongoose";

let cachedConnection = null;
const connectDB = (handler) => async (req, res) => {
  try {
    if (cachedConnection && cachedConnection.readyState === 1) {
      // If a connection exists and is ready, reuse it
      return handler(req, res);
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    cachedConnection = conn;
    return handler(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
