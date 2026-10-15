import { Schema } from "mongoose";
import mongoose from "mongoose";

const houseHoldSchema = new Schema({
  userList: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  choreList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chore",
    },
  ],
});

const HouseHold = mongoose.model("HouseHold", houseHoldSchema);
export default HouseHold;
