"use strict";
module.exports = function (sequelize, DataTypes) {
  const Response = sequelize.define(
    "Response",
    {
      register_code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      task_code: {
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
      tableName: "register_task",
      timestamps: false,
    }
  );

  Response.associate = function (models) {
    Response.belongsTo(models.Task, {
      as: "task",
      foreignKey: "task_code",
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
