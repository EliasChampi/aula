"use strict";
module.exports = function (sequelize, DataTypes) {
  const Teacher = sequelize.define("Teacher", {
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
    image: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
    {
      tableName: "teachers",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Teacher;
};
