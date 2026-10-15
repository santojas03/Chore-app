import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

await connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
