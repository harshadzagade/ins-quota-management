const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const { authenticate } = require("../middleware/auth"); // ✅ Ensure correct import
const { verifyRole } = require("../middleware/auth"); // ✅ Ensure correct import

// 🔹 Authenticate all routes
router.use(authenticate);

// ✅ Submit Application (Any authenticated user)
router.post("/submit", applicationController.submitApplication);

// ✅ Get Application by ID (Superadmin, Admin, Master)
router.get("/:applicationId", verifyRole(["superadmin", "admin", "master"]), applicationController.getApplicationById);

// ✅ Get All Applications (Role-based access)
router.get("/", verifyRole(["superadmin", "admin", "master"]), applicationController.getAllApplications);

module.exports = router;
