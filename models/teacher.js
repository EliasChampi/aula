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
    fullname: {
      type: DataTypes.VIRTUAL,
      get() {
        return [this.name, ", ", this.surname].join("");
      },
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
