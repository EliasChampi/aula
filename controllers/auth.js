const { Teacher, Student, Register, Sequelize } = require("../models");
const config = require("../config/auth");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { year } = require("../config/utils");

async function promiseByModel(type, dni) {
  if (type === "estudiante") {
    return await Register.findOne({
      where: {
        student_dni: dni,
        state: "a",
        section_code: {
          $like: year + "%",
        },
      },
      include: [
        {
          model: Student,
          as: "student",
        },
      ],
    });
  }
  return await Teacher.findOne({
    where: {
      dni: dni,
      state: true,
    },
  });
}

async function updatePassword(req, res) {
  try {
    const password = bcrypt.hashSync(req.body.newPassword);
    const Model = req.body.type === "estudiante" ? Student : Teacher;
    const value = await Model.findOne({
      where: {
        dni: req.body.dni,
      },
    });
    var passwordIsValid = bcrypt.compareSync(req.body.password, value.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Su contraseña actual es incorrecta",
      });
    }
    value.password = password;
    await value.save(["password"]);

    return res.status(200).json({ message: "Correctamente Actualizado" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function recoverPassword(req, res) {
  try {
    const Model = req.body.type === "estudiante" ? Student : Teacher;

    const value = await Model.findOne({
      where: {
        dni: req.body.dni,
        birthdate: req.body.birthdate,
      },
    });

    if (!value) {
      return res.status(401).send({
        message: "Sus datos proporcionados no son correctos",
      });
    }

    if (typeof value.state !== "undefined" && value.state) {
      return res.status(401).send({
        message: "No Autorizado",
      });
    }

    const newPassword = Buffer.from(Math.random().toString())
      .toString("base64")
      .substr(7, 7);

    value.password = bcrypt.hashSync(newPassword);

    await value.save(["password"]);

    return res.status(200).json({
      value: newPassword,
      message: "Su nueva contraseña se ha generado",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

function signin(req, res) {
  promiseByModel(req.body.type, req.body.dni)
    .then((entity) => {
      if (!entity) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      let model = {};
      let password = entity.password;
      if (req.body.type === "estudiante") {
        password = entity.student.password;
        model = {
          dni: entity.student_dni,
          register_code: entity.code,
          section_code: entity.section_code,
          name: entity.student.name,
          fullname: entity.student.fullname,
          image: entity.student.image,
        };
      } else {
        model = {
          dni: entity.dni,
          name: entity.name,
          fullname: entity.fullname,
          image: entity.image,
        };
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, password);

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
        entity: model,
        mode: req.body.type,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

module.exports = {
  signin,
  updatePassword,
  recoverPassword,
};
