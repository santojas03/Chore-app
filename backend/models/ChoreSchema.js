import { Schema } from "mongoose";
import mongoose from "mongoose";

const chore = new Schema({
  task: [
    {
      // ownerIds -> type: Schema.Types.ObjectId ; re: "User"
    },
  ],
});
