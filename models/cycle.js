module.exports = function(Sequelize, sequelize) {
  return sequelize.define(
    "Cycle",
    {
      code: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      branch_code: {
        type: Sequelize.INTEGER
      }
    },
    {
      tableName: "cycles",
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );
};
