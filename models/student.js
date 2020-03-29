module.exports = function(Sequelize, sequelize) {
  return sequelize.define(
    "Student",
    {
      dni: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      second_surname: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      }
    },
    {
      tableName: "students",
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );
};
