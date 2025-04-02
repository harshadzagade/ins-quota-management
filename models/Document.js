const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Document = db.define(
  'document',
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
        model: 'applications', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
    },
    documentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Document;