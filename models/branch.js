"use strict";
module.exports = function(sequelize, DataTypes) {
  const Branch = sequelize.define(
    "Branch",
    {
      code: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      name: DataTypes.STRING
    },
    {
      tableName: "branches",
      timestamps: false
    }
  );
  Branch.associate = function(models) {
    Branch.hasMany(models.Cycle, {
      as: "cycles",
      foreignKey: "branch_code",
      sourceKey: "code"
    });
  };
  return Branch;
};
