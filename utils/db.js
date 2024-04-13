import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;
const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection established...🔗");
  } catch (error) {
    console.error("❌❌ Error connecting to server ❌❌");
    process.exit(0);
  }
};

export default connectDb;
