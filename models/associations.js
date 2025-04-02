const { Sequelize } = require("sequelize");
const db = require("../config/db.js");
const Institute = require("./Institute.js");
const Program = require("./Program.js");
const Staff = require("./Staff.js");
const User = require("./User.js");
const Application = require("./Application.js");
const EntranceExam = require("./EntranceExam.js");
const EducationQualification = require("./EducationQualification.js");
const Document = require("./Document.js");
const OTP = require("./Otp.js");


// Institute 1:N Program
Institute.hasMany(Program, { foreignKey: "instituteId" });
Program.belongsTo(Institute, { foreignKey: "instituteId" });

// Institute 1:N Staff (for admins)
Institute.hasMany(Staff, { foreignKey: "instituteId" });
Staff.belongsTo(Institute, { foreignKey: "instituteId" });

// Institute 1:N User (for students) 
Institute.hasMany(User, { foreignKey: "instituteId" });
User.belongsTo(Institute, { foreignKey: "instituteId" });

// Program 1:N User
Program.hasMany(User, { foreignKey: "programId" });
User.belongsTo(Program, { foreignKey: "programId" });

// User 1:N Application (To track multiple applications for different programs/institutes)
User.hasMany(Application, { foreignKey: "userId" });
Application.belongsTo(User, { foreignKey: "userId" });

// Application belongs to Program & Institute (to ensure correct program/institute relationship)
Application.belongsTo(Program, { foreignKey: "programId" });
Application.belongsTo(Institute, { foreignKey: "instituteId" });

// EntranceExam N:1 Application (Many EntranceExams can belong to one Application)
EntranceExam.belongsTo(Application, { foreignKey: "applicationId" });
Application.hasMany(EntranceExam, { foreignKey: "applicationId" });

// Application 1:N EducationQualification
Application.hasMany(EducationQualification, { foreignKey: "applicationId" });
EducationQualification.belongsTo(Application, { foreignKey: "applicationId" });

// User 1:N OTP (for student OTPs)
User.hasMany(OTP, { foreignKey: "userId" });
OTP.belongsTo(User, { foreignKey: "userId" });

// Staff 1:N OTP (for staff OTPs)
Staff.hasMany(OTP, { foreignKey: "staffId" });
OTP.belongsTo(Staff, { foreignKey: "staffId" });

// Document 1:N Application
Application.hasMany(Document, { foreignKey: "applicationId" });
Document.belongsTo(Application, { foreignKey: "applicationId" });
