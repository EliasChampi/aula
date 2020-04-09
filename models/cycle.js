"use strict";
module.exports = function (sequelize, DataTypes) {
  const Cycle = sequelize.define(
    "Cycle",
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      branch_code: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "cycles",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  Cycle.associate = function (models) {
    Cycle.hasMany(models.Degree, {
      as: "degrees",
      foreignKey: "cycle_code",
      sourceKey: "code",
    });
    Cycle.belongsTo(models.Branch, {
      as: "branch",
      foreignKey: "branch_code",
      targetKey: "code",
    });
  };
  return Cycle;
};
