"use strict";
module.exports = function(sequelize, DataTypes) {
  const Course = sequelize.define(
    "Course",
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      }
    },
    {
      tableName: "courses",
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );
  Course.associate = function(models) {
    Course.hasMany(models.OperativeTeacher, {
      as: "teachers",
      foreignKey: "course_code",
      sourceKey: "code"
    });
  };
  return Course;
};
