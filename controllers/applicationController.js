const Application = require("../models/Application");
const EducationQualification = require("../models/EducationQualification");
const EntranceExam = require("../models/EntranceExam");
const Document = require("../models/Document");
const User = require("../models/User");
const Program = require("../models/Program");
const Institute = require("../models/Institute");
const { verifyRole } = require("../middleware/auth");
const { Op } = require("sequelize");

exports.submitApplication = async (req, res) => {
  const {
    applicationNo,
    applicationDate,
    userId,
    dob,
    gender,
    phoneNo,
    mobileNo,
    allIndiaMeritNo,
    stateMeritNo,
    email,
    address,
    programId,
    instituteId,
    educationQualifications,
    entranceExams,
    documents,
  } = req.body;

  try {
    // Check if the application already exists for the user
    const existingApplication = await Application.findOne({
      where: { userId, programId, instituteId },
    });
    if (existingApplication) {
      return res.status(400).json({ message: "Application already submitted" });
    }


    // Create Application
    const application = await Application.create({
      applicationNo,
      applicationDate,
      userId,
      dob,
      gender,
      phoneNo,
      mobileNo,
      allIndiaMeritNo,
      stateMeritNo,
      email,
      address,
      programId,
      instituteId,
    });

    // Add Educational Qualifications
    if (educationQualifications && educationQualifications.length > 0) {
      await EducationQualification.bulkCreate(
        educationQualifications.map((qualification) => ({
          ...qualification,
          applicationId: application.id,
        }))
      );
    }

    // Add Entrance Exam Details
    if (entranceExams && entranceExams.length > 0) {
      await EntranceExam.bulkCreate(
        entranceExams.map((exam) => ({
          ...exam,
          applicationId: application.id,
        }))
      );
    }

    // Add Documents
    if (documents && documents.length > 0) {
      await Document.bulkCreate(
        documents.map((doc) => ({
          ...doc,
          applicationId: application.id,
        }))
      );
    }

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get application details by applicationId
exports.getApplicationById = async (req, res) => {
  const { applicationId } = req.params;

  try {
    // Fetch application first
    const application = await Application.findByPk(applicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Fetch related data only if application exists
    const [user, program, institute, educationQualifications, entranceExams, documents] = await Promise.all([
      User.findByPk(application.userId),
      Program.findByPk(application.programId),
      Institute.findByPk(application.instituteId),
      EducationQualification.findAll({
        where: { applicationId }
      }),
      EntranceExam.findAll({
        where: { applicationId }
      }),
      Document.findAll({
        where: { applicationId }
      }),
    ]);

    // Attach associated data
    application.dataValues.user = user || null;
    application.dataValues.program = program || null;
    application.dataValues.institute = institute || null;
    application.dataValues.educationQualifications = educationQualifications || [];
    application.dataValues.entranceExams = entranceExams || [];
    application.dataValues.documents = documents || [];

    res.status(200).json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllApplications = async (req, res) => {
  try {
    let whereCondition = {};

    if (req.user.role === "admin") {
      // Admin can only see applications for their own institute
      whereCondition.instituteId = req.user.instituteId;
    } else if (req.user.role !== "superadmin" && req.user.role !== "master") {
      // Unauthorized roles
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Fetch applications with related data in one query
    const applications = await Application.findAll({
      where: whereCondition,
      include: [
        { model: User, attributes: ["id", "firstName", "lastName", "email"] },
        { model: Program, attributes: ["id", "name"] },
        { model: Institute, attributes: ["id", "name"] },
      ],
    });

    res.status(200).json({ message: "Applications retrieved successfully", applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

