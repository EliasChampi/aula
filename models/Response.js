"use strict";
module.exports = function (sequelize, DataTypes) {
  const Response = sequelize.define(
    "Response",
    {
      register_code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      question_code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      repos: {
        type: DataTypes.STRING(100),
      },
      cali: {
        type: DataTypes.DECIMAL(2, 2),
      },
    },
    {
      tableName: "question_register",
      timestamps: false
    }
  );

  Response.associate = function (models) {
    Response.belongsTo(models.Question, {
      as: "question",
      foreignKey: "question_code",
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
