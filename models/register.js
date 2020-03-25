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
        /*             references: {
                model: Section,
                key: "code"
            } */
      },
      student_dni: {
        type: Sequelize.STRING
        /*            references: {
                model: student,
                key: "dni"
            } */
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
