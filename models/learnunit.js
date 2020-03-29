module.exports = function(Sequelize, sequelize) {
  return sequelize.define(
    "LearnUnit",
    {
      code: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [10, 100]
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          len: [15, 300]
        }
      },
      trim: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [3, 3]
        }
      },
      operative_teacher_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "learnunits",
      createdAt: "created_at",
      updatedAt: false
    }
  );
};
