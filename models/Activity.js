"use strict";
module.exports = function (sequelize, DataTypes) {
  const Activity = sequelize.define(
    "Activity",
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
      videoid: {
        type: DataTypes.STRING(100),
        validate: {
          len: [0, 12],
        },
      },
      to_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      unit_code: {
        type: DataTypes.INTEGER,
      },
      attached: {
        type: DataTypes.STRING(100),
      },
    },
    {
      tableName: "activities",
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  Activity.associate = function (models) {
    Activity.belongsTo(models.Unit, {
      as: "unit",
      foreignKey: "unit_code",
      targetKey: "code",
    });
    Activity.hasMany(models.Response, {
      as: "responses",
      foreignKey: "activity_code",
      sourceKey: "code",
    });
  };
  return Activity;
};
