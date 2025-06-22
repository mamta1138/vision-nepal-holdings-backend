const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    status: {
      type: String,
      enum: ["read", "unread", "pending"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscriber", subscriberSchema);
