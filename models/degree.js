module.exports = function(Sequelize, sequelize) {
  return sequelize.define(
    "Degree",
    {
      code: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      cycle_code: {
        type: Sequelize.STRING
        /*             references: {
                model: Cycle,
                key: "code"
            } */
      }
    },
    {
      tableName: "degrees",
      timestamps: false
    }
  );
};
