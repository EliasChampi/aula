const config = require("../config/database.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});
// db
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// models
db.Teacher = require("./teacher.js")(Sequelize, sequelize);
db.Family = require("./family.js")(Sequelize, sequelize);
//endModels
module.exports = db;
