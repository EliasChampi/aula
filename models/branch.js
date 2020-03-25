module.exports = function(Sequelize, sequelize) {
  return sequelize.define(
    "Branch",
    {
      code: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: Sequelize.STRING
    },
    {
      tableName: "branches",
      timestamps: false
    }
  );
};
