"use strict";
const Sequelize = require("sequelize");
const {
  DB,
  USER,
  PASSWORD,
  HOST,
  dialect,
  pool,
} = require("../config/database.js");
var fs = require("fs");
var path = require("path");
var basename = path.basename(__filename);

const Op = Sequelize.Op;
const db = {};
const operatorsAliases = {
  $like: Op.like,
  $not: Op.not,
  $and: Op.and,
  $gte: Op.gte,
};

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect,
  pool,
  operatorsAliases,
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
