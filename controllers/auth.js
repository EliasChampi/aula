const { Teacher, Family } = require("../models");
const config = require("../config/auth");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

function signin(req, res) {
  let Model = {};
  let image = "default_men.png";
  if (req.body.type === "apoderado") {
    Model = Family;
  } else {
    Model = Teacher;
  }
  Model.findOne({
    where: {
      dni: req.body.dni,
    },
  })
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

      if (req.body.type === "docente") {
        image = entity.image;
      }
      res.status(200).send({
        dni: entity.dni,
        name: entity.name,
        surname: entity.surname,
        mode: req.body.type,
        image: image,
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
