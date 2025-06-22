const Investor = require("../models/InvestorModel");
const investorValidation = require("../helper/investor_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });


const addInvestor = async (req, res) => {
  try {

    const passportPhoto = req.files?.passportPhoto?.[0]?.path;
    const verifyingDocuments = req.files?.verifyingDocuments?.map(file => file.path) || [];

    if (!passportPhoto) {
      return res.status(400).json({ message: "Passport photo is required" });
    }
    if (!verifyingDocuments.length) {
      return res.status(400).json({ message: "At least one verifying document is required" });
    }

    req.body.documents = { passportPhoto, verifyingDocuments };

    req.body.isSameAsPermanentAddress = req.body.isSameAsPermanentAddress === "true";

    if (req.body.isSameAsPermanentAddress) {
      req.body.temporaryAddress = { ...req.body.permanentAddress };
    }

    const { error, value } = investorValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existing = await Investor.findOne({ email: value.email });
    if (existing) {
      return res.status(400).json({ message: "Investor with this email already exists" });
    } 

    const newInvestor = new Investor({ ...value, status: "pending" });
    await newInvestor.save();

    return res.status(201).json({ message: "success", item: newInvestor });

  } catch (error) {
    console.error("Add Investor Error:", error.message);
    return res.status(500).json({ message: "Failed to add investor" });
  }
};


module.exports = { addInvestor, upload };
