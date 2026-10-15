import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Copy .env.example to .env and fill it in.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(
      `The database is running and connected! ${conn.connection.host}`,
    );
  } catch (error) {
    console.error(`${error.message}`);
    process.exit(1);
  }
};
