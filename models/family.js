module.exports = (Sequelize, sequelize) => {
  const Family = sequelize.define("Family", {
    code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    dni: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  },{
    tableName: 'families',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Family;
}
