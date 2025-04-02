const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const Staff = db.define("staff",
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
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "superadmin", "master"],
      },
      instituteId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "institutes", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = Staff;