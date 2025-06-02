const Investor = require("../models/InvestorModel");
const investorValidation = require("../helper/investor_validator");

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
    await Investor.findOne({
      email: value.email,
      phone: value.phone,
    }).then((value) => {
      if (value) {
        return res.status(400).json({
          message: "Investor with this email or phone already exists",
        });
      }
    });

    // create new investor
    let newInvestor = new Investor({
      ...value,
      status: value.status || "pending",
    });

    return res.status(201).json({
      message: "success",
      item: newInvestor,
    });
  } catch (error) {
    console.error("Add Investor Error:", error.message);
    return res.status(500).json({ message: "Failed to add investor" });
  }
};

module.exports = addInvestor;
