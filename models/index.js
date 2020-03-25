const Sequelize = require("sequelize");
const {
  DB,
  USER,
  PASSWORD,
  HOST,
  dialect,
  pool
} = require("../config/database.js");

// importing
const Branch = require("./branch.js");
const Course = require("./course.js");
const Cycle = require("./cycle.js");
const Degree = require("./degree.js");
const Family = require("./family.js");
const OperativeTeacher = require("./operativeTeacher.js");
const Register = require("./register.js");
const Section = require("./section.js");
const Student = require("./student.js");
const Teacher = require("./teacher.js");

const Op = Sequelize.Op;
const operatorsAliases = {
  $like: Op.like,
  $not: Op.not
};

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect,
  pool,
  operatorsAliases
});
// db
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// models
db.Teacher = Teacher(Sequelize, sequelize);
db.Family = Family(Sequelize, sequelize);
db.Branch = Branch(Sequelize, sequelize);
db.Course = Course(Sequelize, sequelize);
db.Cycle = Cycle(Sequelize, sequelize);
db.Degree = Degree(Sequelize, sequelize);
db.OperativeTeacher = OperativeTeacher(Sequelize, sequelize);
db.Register = Register(Sequelize, sequelize);
db.Section = Section(Sequelize, sequelize);
db.Student = Student(Sequelize, sequelize);
//endModels

//asociations
db.OperativeTeacher.belongsTo(db.Course, {
  as: "courses",
  foreignKey: "course_code"
});
module.exports = db;
