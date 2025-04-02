const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('managementseats', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  port: 5432
});

sequelize.authenticate().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;