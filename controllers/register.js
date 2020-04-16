const {
  Register,
  Student,
  Section,
  Degree,
  Cycle,
  Response,
} = require("../models");
async function fetchByStudent(req, res) {
  try {
    const values = await Register.findAll({
      where: {
        student_dni: req.params.dni,
      },
      include: [
        {
          model: Section,
          as: "section",
          include: [
            {
              model: Degree,
              as: "degree",
              include: [
                {
                  model: Cycle,
                  as: "cycle",
                },
              ],
            },
          ],
        },
      ],
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
        section_code: req.params.section_code,
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

async function fetchBySectionWithResponse(req, res) {
  try {
    const values = await Register.findAll({
      where: {
        section_code: req.params.section_code,
      },
      attributes: ["code", "student_dni"],
      include: [
        {
          attributes: ["name", "surname", "second_surname"],
          model: Student,
          as: "student",
        },
        {
          attributes: ["attached", "score", "obs"],
          model: Response,
          as: "responses",
          where: {
            task_code: req.params.task_code,
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
  fetchBySectionWithResponse,
};
