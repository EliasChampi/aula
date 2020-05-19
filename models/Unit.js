"use strict";
module.exports = function (sequelize, DataTypes) {
  const Unit = sequelize.define("Unit", {
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
      tableName: "units",
      createdAt: "created_at",
      updatedAt: false,
    }
  );
  Unit.associate = function (models) {
    Unit.belongsToMany(models.OperativeTeacher, {
      as: { singular: "Operative", plural: "Operatives" },
      through: "unit_operative_teacher",
      foreignKey: "unit_code",
      sourceKey: "code",
      timestamps: false,
    });

    Unit.hasMany(models.Session, {
      as: "sessions",
      foreignKey: "unit_code",
      sourceKey: "code",
    });
  };
  return Unit;
};
