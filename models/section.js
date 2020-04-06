"use strict";
module.exports = function(sequelize, DataTypes) {
  const Section = sequelize.define(
    "Section",
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      section_name: {
        type: DataTypes.STRING
      },
      degree_code: {
        type: DataTypes.STRING
      }
    },
    {
      tableName: "sections",
      timestamps: false
    }
  );
  Section.associate = function(models) {
    Section.hasMany(models.OperativeTeacher, {
      as: "teachers",
      foreignKey: "section_code",
      sourceKey: "code"
    });
    Section.belongsTo(models.Degree, {
      as: "degree",
      foreignKey: "degree_code",
      targetKey: "code"
    });
    Section.hasMany(models.Register, {
      as: "registers",
      foreignKey: "section_code",
      sourceKey: "code"
    });
  };
  return Section;
};
