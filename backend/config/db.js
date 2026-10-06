import mongoose from "mongoose";

export const connectDB = async (params) => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://imanueldartey_db_user:<db_password>@cluster0.m1cdyj4.mongodb.net/?appName=Cluster0",
    );
    console.log(
      `The database is running and connected! ${conn.connection.host}`,
    );
  } catch (error) {
    console.error(`${error.message}`);
    process.exit(1);
  }
};
