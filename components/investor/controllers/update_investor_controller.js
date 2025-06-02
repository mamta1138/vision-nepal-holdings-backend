const Investor = require("../models/InvestorModel")

const updateInvestor = async (req, res) => {
  const { id } = req.params;
  const { error, value } = investorValidation.validate(req.body);

  try {
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    // Check if investor exists
    const existingInvestor = await Investor.findById(id);
    if (!existingInvestor) {
      return res.status(404).json({
        message: "Investor not found",
      });
    }

    // Check if email or phone is being updated to an existing one
    const duplicateInvestor = await Investor.findOne({
      $and: [
        { _id: { $ne: id } }, // Exclude current investor
        { $or: [{ email: value.email }, { phone: value.phone }] }
      ]
    });

    if (duplicateInvestor) {
      return res.status(400).json({
        message: "Investor with this email or phone already exists",
      });
    }

    // Update investor
    const updatedInvestor = await Investor.findByIdAndUpdate(
      id,
      { ...value },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Investor updated successfully",
      item: updatedInvestor,
    });
  } catch (error) {
    console.error("Update Investor Error:", error.message);
    return res.status(500).json({ message: "Failed to update investor" });
  }
};

module.exports = updateInvestor;