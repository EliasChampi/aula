"use strict";
module.exports = function (sequelize, DataTypes) {
  const Task = sequelize.define(
    "Task",
    {
      code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.CHAR(2),
        allowNull: false,
        validate: {
          len: [2, 2],
        },
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [5, 50],
        },
      },
      content: {
        type: DataTypes.STRING(300),
        allowNull: false,
        validate: {
          len: [10, 300],
        },
      },
      link: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          len: [10, 12],
        },
      },
      to_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      learnunit_code: {
        type: DataTypes.INTEGER,
      },
      attached: {
        type: DataTypes.STRING(100),
      },
    },
    {
      tableName: "tasks",
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  Task.associate = function (models) {
    Task.belongsTo(models.LearnUnit, {
      as: "learn",
      foreignKey: "learnunit_code",
      targetKey: "code",
    });
    Task.hasMany(models.Response, {
      as: "responses",
      foreignKey: "task_code",
      sourceKey: "code",
    });
  };
  return Task;
};
