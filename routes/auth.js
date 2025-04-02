const express = require("express");
const {
  registerUser,
  login,
  verifyOtp,
  resendOtp,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

module.exports = router;
