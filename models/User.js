const sequelize = require("sequelize");
const { DataTypes } = sequelize;
const db = require("../config/db.js");

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [10], // Assuming Indian phone numbers (10 digits)
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
    programId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "programs", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;