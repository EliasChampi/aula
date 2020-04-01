module.exports = function(Sequelize, sequelize) {
  return sequelize.define(
    "Task",
    {
      code: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          len: [5, 50]
        }
      },
      description: {
        type: Sequelize.STRING(300),
        allowNull: false,
        validate: {
          len: [10, 300]
        }
      },
      to_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      learnunit_code: {
        type: Sequelize.INTEGER
      },
      attached: {
        type: Sequelize.STRING(100)
      }
    },
    {
      tableName: "tasks",
      createdAt: "created_at",
      updatedAt: false
    }
  );
};
