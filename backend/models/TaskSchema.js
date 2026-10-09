import { Schema } from "mongoose";
import mongoose from "mongoose";

import categoryType from "../resources/categoryTypes.js";

const taskSchema = new Schema({
  // task details
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  category: [
    {
      type: Object.values(categoryType),
      required: true,
    }
  ],
  points: {
    type: Number,
    required: true,
    default: 0,
  },

  // users assigned
  usersAssigned: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],

  // task necessities
  shoppingList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    }
  ],

  // task status
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  frequency: {
    type: Number,
    default: 0,
  },
  isOverdue: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;