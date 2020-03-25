module.exports = function(Sequelize, sequelize) {
  return sequelize.define(
    "Section",
    {
      code: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      section_name: {
        type: Sequelize.STRING
      },
      degree_code: {
        type: Sequelize.STRING
        /*             references: {
                model: Degree,
                key: "code"
            } */
      }
    },
    {
      tableName: "sections",
      timestamps: false
    }
  );
};
