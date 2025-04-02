const express = require("express");
const router = express.Router();
const { authenticate, verifyRole } = require("../middleware/auth");
const { createAdmin } = require("../controllers/adminController");

// ✅ Only Superadmin can create an Admin
router.post("/create-admin", authenticate, verifyRole(["superadmin"]), createAdmin);

module.exports = router;
