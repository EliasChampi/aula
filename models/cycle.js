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
      /*       from_date: {
        type: Sequelize.DATE
      }, */
      branch_code: {
        type: Sequelize.INTEGER
        /*             references: {
                model: Branch,
                key: "code"
            } */
      }
    },
    {
      tableName: "cycles",
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );
};
