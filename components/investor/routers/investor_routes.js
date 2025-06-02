const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const addInvestor = require("../controllers/add_investor_controller");
const updateInvestor = require("../controllers/update_investor_controller");
const {
  listAllInvestors,
  listInvestor,
} = require("../controllers/list_all_investor");
const deleteInvestor = require("../controllers/delete_investor_controller");

router.post(
  "/",
  verifyToken,
  checkRole("admin", "editor"),
  addInvestor
);
router.put(
  "/:id",
  verifyToken,
  checkRole("admin", "editor"),
  updateInvestor
);
router.get("/", listAllInvestors);
router.get("/:id", listInvestor);
router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteInvestor);

module.exports = router;
