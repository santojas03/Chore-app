import { Schema } from "mongoose";
import mongoose from "mongoose";

const choreSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  usersAssigned: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

const Chore = mongoose.model("Chore", choreSchema);
export default Chore;
