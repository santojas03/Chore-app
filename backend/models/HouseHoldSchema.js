import { Schema } from "mongoose";
import mongoose from "mongoose";
import { randomInt } from "crypto";

// No 0/O or 1/I/L, so codes are easy to read off a screen and type.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 6;

export const generateInviteCode = () =>
  Array.from(
    { length: CODE_LENGTH },
    () => CODE_ALPHABET[randomInt(CODE_ALPHABET.length)],
  ).join("");

const houseHoldSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    inviteCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    id: false, // don't add an "id" copy of _id when virtuals are serialized
    toJSON: { virtuals: true, versionKey: false },
  },
);

// Membership is stored only on User.household, so there is a single source
// of truth. This virtual lets us .populate("members") when we need the list.
houseHoldSchema.virtual("members", {
  ref: "User",
  localField: "_id",
  foreignField: "household",
});

const HouseHold = mongoose.model("HouseHold", houseHoldSchema);
export default HouseHold;
