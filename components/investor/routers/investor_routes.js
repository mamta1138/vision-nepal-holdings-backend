const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const {addInvestor, upload} = require("../controllers/add_investor_controller");
const updateInvestor = require("../controllers/update_investor_controller");
const {
  listAllInvestors,
  listInvestor,
} = require("../controllers/list_all_investor");
const deleteInvestor = require("../controllers/delete_investor_controller");

router.post(
  "/",
    upload.fields([
    { name: "passportPhoto", maxCount: 1 },
    { name: "verifyingDocuments", maxCount: 5 }
  ]),
  addInvestor
);
router.put(
  "/:id",
  verifyToken,
  checkRole("admin", "editor"),
    upload.fields([
    { name: "passportPhoto", maxCount: 1 },
    { name: "verifyingDocuments", maxCount: 5 }
  ]),  
  updateInvestor
);
router.get("/", listAllInvestors);
router.get("/:id", listInvestor);
router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteInvestor);

module.exports = router;
