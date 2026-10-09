import { Schema } from "mongoose";
import mongoose from "mongoose";

const personalSchema = new Schema({
  choreList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  shoppingList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  maintenanceList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    }
  ],
  projectList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    }
  ],
});

const Personal = mongoose.model("Personal", personalSchema);
export default Personal;
