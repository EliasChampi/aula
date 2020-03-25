const { OperativeTeacher, Course } = require("../models");
const { year } = require("../config/utils.js");
async function fetchByTeacher(req, res) {
  try {
    const values = await OperativeTeacher.findAll({
      where: {
        teacher_dni: req.params.dni,
        section_code: {
          $like: year + "%"
        }
      },
      include: [
        {
          model: Course,
          as: "courses"
        }
      ]
    });
    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  fetchByTeacher
};
