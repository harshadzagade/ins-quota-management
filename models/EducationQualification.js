const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const EducationQualification = db.define(
    "education_qualification",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "applications", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
      },
      stream: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qualificationName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      board: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      school: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      marksObtained: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      percentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      passingYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = EducationQualification;
  