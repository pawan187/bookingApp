const Sequelize = require('sequelize');
// var app = require('../app.js');
const sequelizeWrite = new Sequelize(
  process.env.DB_Name,
  process.env.DB_User,
  process.env.DB_Pass, {
  host: process.env.DB_Host,
  dialect: 'mysql',
  pool: {
    max: 1000,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelizeWrite
  .authenticate()
  .then(() => {
    console.log('Write Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Write Unable to connect to the database:', err);
  });


const sequelizeRead = new Sequelize(
  process.env["DB_Name"],
  process.env["DB_User"],
  process.env["DB_Pass"], {
  host: process.env["DB_Host"],
  dialect: 'mysql',
  pool: {
    max: 1000,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelizeRead
  .authenticate()
  .then(() => {
    console.log('Read Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Read Unable to connect to the database:', err);
  });


module.exports.Sequelize = Sequelize;
module.exports.sequelizeWrite = sequelizeWrite;
module.exports.sequelizeRead = sequelizeRead;
