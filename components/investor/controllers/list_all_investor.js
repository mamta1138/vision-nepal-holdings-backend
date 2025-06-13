const Investor = require("../models/InvestorModel");

const listAllInvestors = async (req, res) => {
  let limit = parseInt(req.query.limit) || 10;
  let page = parseInt(req.query.page) || 1;
  let skip = (page - 1) * limit;
  let sort = req.query.sort || "createdAt";
  let order = req.query.order === "asc" ? 1 : -1;
  let search = req.query.search || "";
  let status = req.query.status;

  try {
    let query = {
      $or: [
        { fullname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ],
    };

    if (status) {
      query.status = status;
    }

    let items = await Investor.find(query)
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit);

    let total = await Investor.countDocuments(query);

    return res.status(200).json({
      status: "success",
      items,
      pagination: {
        currentPage: page,
        totalEntries: total,
        totalPages: Math.ceil(total / limit),
        entriesPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List All Investor Error:", error.message);
    return res.status(500).json({ message: "Failed to fetch investors" });
  }
};

const listInvestor = async (req, res) => {
  let investorId = req.params.id;
  try {
    let item = await Investor.findById(investorId);
    if (!item) {
      return res.status(404).json({ message: "Investor not found" });
    }
    return res.status(200).json({
      status: "success",
      item,
    });
  } catch (error) {
    console.error("List Investor Error:", error.message);
    return res.status(500).json({ message: "Failed to fetch investor" });
  }
};

module.exports = { listAllInvestors, listInvestor };
