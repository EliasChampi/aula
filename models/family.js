"use strict";
module.exports = function (sequelize, DataTypes) {
  const Family = sequelize.define(
    "Family",
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      dni: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      surname: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "families",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Family;
};
