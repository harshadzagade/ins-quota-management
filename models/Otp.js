const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const OTP = db.define(
    "otp",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
      },
      staffId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "staffs", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

    module.exports = OTP;