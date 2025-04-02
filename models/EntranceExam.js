const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const EntranceExam = db.define(
    "entrance_exam",
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
      examType: {
        type: DataTypes.ENUM,
        values: ["pharmacyDiploma", "pharmacyDegree", "other"],
      },
      cetApplicationId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cetScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cetPercentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      catScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      catPercentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      cmatScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cmatPercentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      gmatScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      gmatPercentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      matScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      matPercentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      atmaScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      atmaPercentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      xatScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      xatPercentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = EntranceExam;