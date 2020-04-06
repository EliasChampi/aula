"use strict";
module.exports = function(sequelize, DataTypes) {
  const Degree = sequelize.define(
    "Degree",
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      cycle_code: {
        type: DataTypes.STRING
      }
    },
    {
      tableName: "degrees",
      timestamps: false
    }
  );
  Degree.associate = function(models) {
    Degree.hasMany(models.Section, {
      as: "sections",
      foreignKey: "degree_code",
      sourceKey: "code"
    });
    Degree.belongsTo(models.Cycle, {
      as: "cycle",
      foreignKey: "cycle_code",
      targetKey: "code"
    });
  };
  return Degree;
};
