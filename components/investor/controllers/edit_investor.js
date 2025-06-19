const mongoose = require("mongoose");
const Investor = require("../models/InvestorModel");
const investorValidation = require("../helper/investor_validator");

const editInvestor = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid investor ID format" });
    }
    const existingInvestor = await Investor.findById(id);
    if (!existingInvestor) {
      return res.status(404).json({ message: "Investor not found" });
    }

    const passportPhoto = req.files?.passportPhoto?.[0]?.path;
    const verifyingDocuments = req.files?.verifyingDocuments?.map(file => file.path);

    const {
      _id,
      __v,
      createdAt,
      updatedAt,
      ...cleanedExistingData
    } = existingInvestor.toObject();

  const updatedBy = req.user?.id || req.user?._id || null;

    const updatedData = {
      ...cleanedExistingData,
      ...req.body,
      ...(updatedBy && { updatedBy }),
    };

    if (passportPhoto || verifyingDocuments?.length) {
      updatedData.documents = {
        ...cleanedExistingData.documents,
        ...(passportPhoto && { passportPhoto }),
        ...(verifyingDocuments?.length && { verifyingDocuments }),
      };
    }

    updatedData.isSameAsPermanentAddress = req.body.isSameAsPermanentAddress === "true";

    if (updatedData.isSameAsPermanentAddress && updatedData.permanentAddress) {
      updatedData.temporaryAddress = { ...updatedData.permanentAddress };
    }

    const { error, value } = investorValidation.validate(updatedData);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedInvestor = await Investor.findByIdAndUpdate(
      id,
      value,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Investor updated successfully",
      item: updatedInvestor
    });

  } catch (err) {
    console.error("Edit Investor Error:", err.message);
    return res.status(500).json({ message: "Failed to update investor" });
  }
};

module.exports = editInvestor;
