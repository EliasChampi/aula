const { Teacher, Student, Sequelize } = require("../models");
const config = require("../config/auth");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { year } = require("../config/utils");


async function promiseByModel(type, dni) {
  if (type === "estudiante") {
    return Student.findOne({
      where: {
        dni: dni,
        [$and]: Sequelize.literal(`exists (
          select * from registers where student_dni = "Student".dni and state = 'a'
          and section_code like '${year}%'
        )`)
      }
    })
  }
  return Teacher.findOne({
    where: {
      dni: dni
    },
  })
}

function signin(req, res) {
  promiseByModel
    .then((entity) => {
      if (!entity) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        entity.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Contraseña Incorrecta!",
        });
      }
      var token = jwt.sign({ dni: entity.dni }, config.secret, {
        expiresIn: parseInt(process.env.JWTTTL),
      });
      res.status(200).send({
        ...entity,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

module.exports = {
  signin,
};
