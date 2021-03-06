const {
  OperativeTeacher,
  Course,
  Section,
  Degree,
  Cycle,
  Branch,
  Teacher,
} = require("../models");
const { year } = require("../config/utils");
async function fetchByTeacher(req, res) {
  try {
    const values = await OperativeTeacher.findAll({
      where: {
        teacher_dni: req.params.dni,
        section_code: {
          $like: year + "%",
        },
      },
      include: [
        {
          model: Course,
          as: "course",
        },
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
                  include: [
                    {
                      model: Branch,
                      as: "branch",
                    },
                  ],
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

async function fetchBySecction(req, res) {
  try {
    const values = await OperativeTeacher.findAll({
      where: {
        section_code: req.params.s_code,
      },
      include: [
        {
          model: Course,
          as: "course",
        },
        {
          model: Teacher,
          as: "teacher",
        },
      ],
    });
    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  fetchByTeacher,
  fetchBySecction,
};
