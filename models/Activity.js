"use strict";
module.exports = function (sequelize, DataTypes) {
  const Activity = sequelize.define(
    "Activity",
    {
      session_code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING(300),
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
      attached: {
        type: DataTypes.STRING(100),
      },
    },
    {
      tableName: "activities",
      timestamps: false
    }
  );

  Activity.associate = function (models) {
    Activity.belongsTo(models.Session, {
      as: "session",
      foreignKey: "session_code",
      targetKey: "code",
    });
    
    Activity.hasMany(models.Question, {
      as: "questions",
      foreignKey: "session_code",
      sourceKey: "session_code",
    });
  };
  return Activity;
};
