const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const User = require("../models/User");
const Staff = require("../models/Staff");
const OTP = require("../models/Otp");
const Program = require("../models/Program");
const Institute = require("../models/Institute");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME, // Your Gmail address
    pass: process.env.EMAIL_PASSWORD, // Your Gmail App Password
  },
});

// ------------------- Send OTP via Email -------------------
const sendOtpEmail = async (email, otpCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP for account verification is: ${otpCode}`,
  };

  await transporter.sendMail(mailOptions);
};

// ------------------- Register User -------------------
exports.registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    instituteId,
    programId,
  } = req.body;

  try {
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Check if the programId and instituteId are valid
    const program = await Program.findByPk(programId);
    const institute = await Institute.findByPk(instituteId);
    if (!program || !institute)
      return res.status(400).json({ message: "Invalid program or institute" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      instituteId,
      programId,
    });

    // Generate and send OTP on email

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({
      userId: newUser.id,
      otp: otpCode,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    // Send OTP via Email
    await sendOtpEmail(email, otpCode);

    res.status(201).json({
      message: "User registered successfully. OTP sent for verification.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Login User/Staff -------------------
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const model = role === "staff" ? Staff : User;
    const user = await model.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isVerified && role !== "staff") {
      return res.status(403).json({ message: "Please verify your account" });
    }

    const token = generateToken(user.id, role);
    res.status(200).json({ token, role, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Verify OTP -------------------
exports.verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const otpRecord = await OTP.findOne({
      where: { userId, otp, expiresAt: { [Op.gt]: new Date() } },
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Verify user
    await User.update({ isVerified: true }, { where: { id: userId } });
    

    // Delete OTP after verification
    await OTP.destroy({ where: { userId } });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Resend OTP -------------------
exports.resendOtp = async (req, res) => {
  const { userId } = req.body;

  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({
      userId,
      otp: otpCode,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Forgot Password -------------------
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({
      userId: user.id,
      otp: otpCode,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    res.status(200).json({ message: "OTP sent for password reset" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
