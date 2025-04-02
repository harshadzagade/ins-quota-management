const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const Application = db.define(
  "application",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    applicationNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    applicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
    },
    programId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "programs", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
    },
    instituteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "institutes", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["Male", "Female", "Other"],
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    allIndiaMeritNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stateMeritNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Application;