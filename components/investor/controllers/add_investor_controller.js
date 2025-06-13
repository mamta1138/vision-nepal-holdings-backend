const Investor = require("../models/InvestorModel");
const investorValidation = require("../helper/investor_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const addInvestor = async (req, res) => {
  const { error, value } = investorValidation.validate(req.body);

  try {
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    // check if investor already exists
    const existingInvestor = await Investor.findOne({
      email: value.email,
      phone: value.phone,
    });

    if (existingInvestor) {
      return res.status(400).json({
        message: "Investor with this email or phone already exists",
      });
    }

    const passportPhoto = req.files?.passportPhoto?.[0]?.path;
    const verifyingDocuments = req.files?.verifyingDocuments?.map(file => file.path) || [];

    if (!passportPhoto) {
      return res.status(400).json({
        message: "Passport photo is required",
      });
    }

    if (!verifyingDocuments || verifyingDocuments.length === 0) {
      return res.status(400).json({
        message: "At least one verifying document is required",
      });
    }

    // create new investor
    let newInvestor = new Investor({
      ...value,
      status: "pending",
      passportPhoto,
      verifyingDocuments,
    });
    
    await newInvestor.save(); 
    
    return res.status(201).json({
      message: "success",
      item: newInvestor,
    });
  } catch (error) {
    console.error("Add Investor Error:", error.message);
    return res.status(500).json({ message: "Failed to add investor" });
  }
};

module.exports = {addInvestor, upload};
