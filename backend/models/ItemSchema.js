import { Schema } from "mongoose";
import mongoose from "mongoose";

const itemSchema = new Schema({
    // item details
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const Item = mongoose.model("Item", itemSchema);
export default Item;