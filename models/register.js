"use strict";
module.exports = function (sequelize, DataTypes) {
  const Register = sequelize.define(
    "Register",
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      section_code: {
        type: DataTypes.STRING,
      },
      student_dni: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "registers",
      createdAt: "created_at",
      updatedAt: false,
    }
  );
  Register.associate = function (models) {
    Register.belongsToMany(models.Task, {
      as: "tasks",
      through: "register_task",
      foreignKey: "register_code",
      sourceKey: "code",
    });
    Register.belongsTo(models.Student, {
      as: "student",
      foreignKey: "student_dni",
      targetKey: "dni",
    });
    Register.belongsTo(models.Section, {
      as: "section",
      foreignKey: "section_code",
      targetKey: "code",
    });
  };
  return Register;
};
