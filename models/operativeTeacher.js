"use strict";
module.exports = function(sequelize, DataTypes) {
  const OperativeTeacher = sequelize.define(
    "OperativeTeacher",
    {
      code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      section_code: {
        type: DataTypes.STRING
      },
      teacher_dni: {
        type: DataTypes.STRING
      },
      course_code: {
        type: DataTypes.STRING
      }
    },
    {
      tableName: "operative_teachers",
      timestamps: false
    }
  );
  OperativeTeacher.associate = function(models) {
    OperativeTeacher.belongsToMany(models.LearnUnit, {
      through: "learnunit_operative_teacher",
      foreignKey: "operative_teacher_code",
      sourceKey: "code"
    });
    OperativeTeacher.belongsTo(models.Course, {
      as: "course",
      foreignKey: "course_code",
      targetKey: "code"
    });
    OperativeTeacher.belongsTo(models.Section, {
      as: "section",
      foreignKey: "section_code",
      targetKey: "code"
    });
  };
  return OperativeTeacher;
};
