const {
  Register,
  Student,
  Response,
} = require("../models");

async function fetchByStudent(req, res) {
  try {
    const values = await Register.findAll({
      where: {
        student_dni: req.params.dni,
      }
    });
    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function fetchBySection(req, res) {
  try {
    const values = await Register.findAll({
      where: {
        section_code: req.params.s_code,
      },
      include: [
        {
          model: Student,
          as: "student",
        },
      ],
    });
    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function fetchBySecWithRes(req, res) {
  try {
    const values = await Register.findAll({
      where: {
        section_code: req.params.s_code,
      },
      attributes: ["code", "student_dni"],
      include: [
        {
          attributes: ["name", "surname", "second_surname", "fullname"],
          model: Student,
          as: "student",
        },
        {
          attributes: ["attached", "score", "obs"],
          model: Response,
          as: "responses",
          where: {
            activity_code: req.params.a_code,
          },
          required: false,
        },
      ],
    });
    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  fetchByStudent,
  fetchBySection,
  fetchBySecWithRes,
};
