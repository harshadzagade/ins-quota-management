const bcrypt = require("bcrypt");
const Staff = require("../models/Staff");

const createSuperadmin = async () => {
  try {
    const email = "harshadz@gmail.com";
    const password = "Admin@123";

    // Check if the Superadmin already exists
    const existingSuperadmin = await Staff.findOne({ where: { email } });
    if (existingSuperadmin) {
      console.log("Superadmin already exists.");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Superadmin
    await Staff.create({
      firstName: "Harshad",
      lastName: "Z",
      email,
      password: hashedPassword,
      role: "superadmin",
      instituteId: null, // Superadmin is not tied to any specific institute
    });

    console.log("Superadmin created successfully.");
  } catch (error) {
    console.error("Error creating Superadmin:", error);
  }
};

createSuperadmin();

exports.createAdmin = async (req, res) => {
  try {
    const { firstName, middleName, lastName, email, password, instituteId } =
      req.body;
    const { role } = req.user; // Assuming role is set in middleware

    // Ensure only Superadmin can create Admins
    if (role !== "superadmin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: Only Superadmin can create Admins" });
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !instituteId) {
      return res
        .status(400)
        .json({ message: "All fields except middleName are required" });
    }

    // Trim input values
    const trimmedEmail = email.trim().toLowerCase();

    // Check if the email already exists
    const existingUser = await Staff.findOne({
      where: { email: trimmedEmail },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin
    const newAdmin = await Staff.create({
      firstName: firstName.trim(),
      middleName: middleName ? middleName.trim() : null,
      lastName: lastName.trim(),
      email: trimmedEmail,
      password: hashedPassword,
      role: "admin",
      instituteId,
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: newAdmin.id,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        email: newAdmin.email,
        instituteId: newAdmin.instituteId,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
