module.exports = function(Sequelize, sequelize) {
  return sequelize.define(
    "OperativeTeacher",
    {
      code: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      section_code: {
        type: Sequelize.STRING
      },
      teacher_dni: {
        type: Sequelize.STRING
      },
      course_code: {
        type: Sequelize.STRING
      }
    },
    {
      tableName: "operative_teachers",
      timestamps: false
    }
  );
};
