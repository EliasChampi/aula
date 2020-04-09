"use strict";
module.exports = function (sequelize, DataTypes) {
  const LearnUnit = sequelize.define(
    "LearnUnit",
    {
      code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      trim: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 3],
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 100],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [15, 300],
        },
      },
    },
    {
      tableName: "learnunits",
      createdAt: "created_at",
      updatedAt: false,
    }
  );
  LearnUnit.associate = function (models) {
    LearnUnit.belongsToMany(models.OperativeTeacher, {
      as: { singular: "Operative", plural: "Operatives" },
      through: "learnunit_operative_teacher",
      foreignKey: "learnunit_code",
      sourceKey: "code",
      timestamps: false,
    });
    LearnUnit.hasMany(models.Task, {
      as: "tasks",
      foreignKey: "learnunit_code",
      sourceKey: "code",
    });
  };
  return LearnUnit;
};
