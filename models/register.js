module.exports = function(Sequelize, sequelize) {
  return sequelize.define(
    "Register",
    {
      code: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      section_code: {
        type: Sequelize.STRING
      },
      student_dni: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      }
    },
    {
      tableName: "registers",
      createdAt: "created_at",
      updatedAt: false
    }
  );
};
