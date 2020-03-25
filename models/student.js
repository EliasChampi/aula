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
      }
    },
    {
      tableName: "students",
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );
};
