"use strict";
module.exports = function (sequelize, DataTypes) {
  const Response = sequelize.define(
    "Response",
    {
      register_code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      activity_code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      attached: {
        type: DataTypes.STRING,
      },
      score: {
        type: DataTypes.STRING,
      },
      obs: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "activity_register",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Response.associate = function (models) {
    Response.belongsTo(models.Activity, {
      as: "activity",
      foreignKey: "activity_code",
      targetKey: "code",
    });
    Response.belongsTo(models.Register, {
      as: "register",
      foreignKey: "register_code",
      targetKey: "code",
    });
  };
  return Response;
};
