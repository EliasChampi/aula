"use strict";
module.exports = function (sequelize, DataTypes) {
  const Student = sequelize.define(
    "Student",
    {
      dni: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      surname: {
        type: DataTypes.STRING,
      },
      second_surname: {
        type: DataTypes.STRING,
      },
      telephone: {
        type: DataTypes.STRING,
      },
      birthdate: {
        type: DataTypes.DATE,
      },
      image: {
        type: DataTypes.STRING,
      },
      fullname: {
        type: DataTypes.VIRTUAL,
        get() {
          return [this.surname, this.second_surname, this.name].join(" ");
        },
      },
    },
    {
      tableName: "students",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Student.associate = function (models) {
    Student.hasMany(models.Register, {
      as: "registers",
      foreignKey: "student_dni",
      sourceKey: "dni",
    });
  };
  return Student;
};
