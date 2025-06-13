const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone no. is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    address: {
      type: {
        street: {
          type: String,
          required: [true, "Street is required"],
          trim: true,
        },
        city: {
          type: String,
          required: [true, "City is required"],
          trim: true,
        },
        state: {
          type: String,
          required: [true, "State is required"],
          trim: true,
        },
        country: {
          type: String,
          required: [true, "Country is required"],
          trim: true,
        },
        zipCode: {
          type: String,
          required: [true, "Zip code is required"],
          trim: true,
        },
      },
      required: [true, "Address is required"],
    },
    passportPhoto: {
      type: String,
      required: [true, "Passport photo is required"],
    },
    verifyingDocuments: {
      type: [String],
      required: [true, "Verifying documents are required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Investor", investorSchema);
