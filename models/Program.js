const { DataTypes } = require("sequelize");
const db = require("../config/db.js");


const Program = db.define(
    "program",
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
      instituteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "institutes", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  module.exports = Program;