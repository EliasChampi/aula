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
// course - operative Teacher
db.Course.hasMany(db.OperativeTeacher, {
  as: "teachers",
  foreignKey: "course_code",
  sourceKey: "code"
});
db.OperativeTeacher.belongsTo(db.Course, {
  as: "course",
  foreignKey: "course_code",
  targetKey: "code"
});
// section -operative Teacher
db.Section.hasMany(db.OperativeTeacher, {
  as: "teachers",
  foreignKey: "section_code",
  sourceKey: "code"
});
db.OperativeTeacher.belongsTo(db.Section, {
  as: "section",
  foreignKey: "section_code",
  targetKey: "code"
});
// degree - section
db.Degree.hasMany(db.Section, {
  as: "sections",
  foreignKey: "degree_code",
  sourceKey: "code"
});
db.Section.belongsTo(db.Degree, {
  as: "degree",
  foreignKey: "degree_code",
  targetKey: "code"
});
// cycle - degree
db.Cycle.hasMany(db.Degree, {
  as: "degrees",
  foreignKey: "cycle_code",
  sourceKey: "code"
});
db.Degree.belongsTo(db.Cycle, {
  as: "cycle",
  foreignKey: "cycle_code",
  targetKey: "code"
});
// branch - cycle
db.Branch.hasMany(db.Cycle, {
  as: "cycles",
  foreignKey: "branch_code",
  sourceKey: "code"
});
db.Cycle.belongsTo(db.Branch, {
  as: "branch",
  foreignKey: "branch_code",
  targetKey: "code"
});
module.exports = db;
