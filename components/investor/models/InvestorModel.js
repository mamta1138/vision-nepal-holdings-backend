const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  remarks: { type: String, trim: true }
}, { _id: false });

const addressSchema = new mongoose.Schema({
  district: { type: String, required: true },
  wardNo: { type: Number, required: true, min: 1, max: 99 },
  houseNo: { type: String, maxlength: 20 },
  streetOrTole: { type: String, required: true },
  municipalityOrRuralMunicipality: { type: String, required: true }
}, { _id: false });

const investorSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  telephoneNumber: { type: String, trim: true },

  permanentAddress: addressSchema,
  temporaryAddress: addressSchema,
  isSameAsPermanentAddress: { type: Boolean, default: false },

  citizenship: {
    number: { type: String, required: true },
    issuedDate: { type: Date, required: true },
    issuedDistrict: { type: String, required: true }
  },

  nationalIdNumber: { type: String, required: true },

  panDetails: {
    panNumber: { type: String, required: true },
    dematNumber: { type: String, required: true }
  },

  shareDetails: {
    agreedAmount: { type: Number, required: true },
    depositedAmount: { type: Number, required: true },
    depositedDate: { type: Date, required: true },
    source: { type: String, required: true },
    remarks: { type: String }
  },

  family: {
    spouseName: { type: String },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    grandfatherName: { type: String, required: true },
    grandmotherName: { type: String, required: true },
    sonName: { type: String },
    daughterName: { type: String },
    daughterInLaw: { type: String },
    fatherInLaw: { type: String }
  },

  jobs: {
    type: [jobSchema],
    required: true,
    validate: [val => val.length > 0, 'At least one job entry is required']
  },

  documents: {
    passportPhoto: { type: String, required: true },
    verifyingDocuments: [{ type: String, required: true }]
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null}

}, { timestamps: true });

module.exports = mongoose.model("Investor", investorSchema);
