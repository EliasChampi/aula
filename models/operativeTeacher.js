module.exports = function(Sequelize, sequelize) {
  return sequelize.define(
    "OperativeTeacher",
    {
      code: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
      },
      section_code: {
        type: Sequelize.STRING
        /*         references: {
          model: Section,
          key: "code"
        } */
      },
      teacher_dni: {
        type: Sequelize.STRING
        /*         references: {
          model: Teacher,
          key: "dni"
        } */
      },
      course_code: {
        type: Sequelize.STRING
        /*         references: {
          model: Course,
          key: "code"
        } */
      }
    },
    {
      tableName: "operative_teachers",
      timestamps: false
    }
  );
};
