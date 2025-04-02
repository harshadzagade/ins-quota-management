const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const Institute = db.define(
    "institute",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
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

module.exports = Institute;