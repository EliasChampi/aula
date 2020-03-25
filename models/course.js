module.exports = function(Sequelize, sequelize) {
  return sequelize.define(
    "Course",
    {
      code: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    },
    {
      tableName: "courses",
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );
};
