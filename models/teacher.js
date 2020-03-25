module.exports = function(Sequelize, sequelize) {
  return sequelize.define(
    "Teacher",
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
      image: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    },
    {
      tableName: "teachers",
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );
};
